<?php
/*
Plugin Name: WooCommerce Remote Payment - Mollie Client
Description: WooCommerce gateway that sends customers to a separate Mollie payment collection server.
Author: Adapted for Mollie
Version: 2.1.2
Requires at least: 6.0
Requires PHP: 7.4
WC requires at least: 7.0
*/

if (!defined('ABSPATH')) {
    exit;
}

define('WRP_MOLLIE_PAYMENT_SERVER_URL', 'https://carrycubes.com');
define('WRP_MOLLIE_PAYMENT_DESCRIPTION', 'Cubes');


add_action('before_woocommerce_init', 'wrp_mollie_declare_hpos_compatibility');
function wrp_mollie_declare_hpos_compatibility() {
    if (class_exists('Automattic\WooCommerce\Utilities\FeaturesUtil')) {
        Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
    }
}

add_action('admin_menu', 'wrp_mollie_client_menu');
function wrp_mollie_client_menu() {
    add_menu_page(
        'Mollie Remote Payment Client',
        'Mollie Remote Payment',
        'manage_options',
        'wrp-mollie-client',
        'wrp_mollie_client_settings_page',
        'dashicons-money-alt'
    );
}

add_action('admin_init', 'wrp_mollie_client_register_settings');
function wrp_mollie_client_register_settings() {
    register_setting('wrp_mollie_client', 'wrp_payment_website', array('sanitize_callback' => 'wrp_mollie_sanitize_server_url'));
    register_setting('wrp_mollie_client', 'wrp_remote_shared_secret', array('sanitize_callback' => 'sanitize_text_field'));
}

function wrp_mollie_sanitize_server_url($value) {
    $value = trim((string) $value);
    if ($value === '') {
        return '';
    }

    if (strpos($value, '://') === false) {
        $value = 'https://' . $value;
    }

    $parts = wp_parse_url($value);
    if (!is_array($parts) || empty($parts['scheme']) || empty($parts['host']) || !in_array(strtolower($parts['scheme']), array('http', 'https'), true)) {
        return '';
    }

    $base = strtolower($parts['scheme']) . '://' . $parts['host'];
    if (!empty($parts['port'])) {
        $base .= ':' . absint($parts['port']);
    }
    if (!empty($parts['path']) && $parts['path'] !== '/') {
        $base .= '/' . trim($parts['path'], '/');
    }

    // The setting is a base URL. Remove accidentally pasted ?mrp=1 / ?srp=1 webhook queries.
    return untrailingslashit(esc_url_raw($base));
}

function wrp_mollie_server_endpoint($server_url, $key) {
    $server_url = wrp_mollie_sanitize_server_url($server_url);
    return add_query_arg($key, '1', trailingslashit($server_url));
}

function wrp_mollie_configured_server_url() {
    return wrp_mollie_sanitize_server_url(WRP_MOLLIE_PAYMENT_SERVER_URL);
}

function wrp_mollie_client_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }
    $payment_server_url = wrp_mollie_configured_server_url();
    ?>
    <div class="wrap">
        <h1>WooCommerce Remote Payment - Mollie Client</h1>
        <p>Connect this WooCommerce store to the WordPress site running the Mollie Server plugin.</p>
        <?php
        $test_result = get_transient('wrp_mollie_test_' . get_current_user_id());
        if (is_array($test_result) && !empty($test_result['message'])) {
            delete_transient('wrp_mollie_test_' . get_current_user_id());
            $notice_class = !empty($test_result['ok']) ? 'notice notice-success' : 'notice notice-error';
            echo '<div class="' . esc_attr($notice_class) . '"><p>' . esc_html($test_result['message']) . '</p></div>';
        }
        ?>
        <form method="post" action="options.php">
            <?php settings_fields('wrp_mollie_client'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="wrp_payment_website">Payment Server URL</label></th>
                    <td>
                        <input id="wrp_payment_website" type="url" name="wrp_payment_website" value="<?php echo esc_attr($payment_server_url); ?>" class="regular-text" readonly />
                        <p class="description">This client is configured to collect payments through <code>https://carrycubes.com</code>.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="wrp_remote_shared_secret">Shared Secret</label></th>
                    <td>
                        <input id="wrp_remote_shared_secret" type="password" name="wrp_remote_shared_secret" value="<?php echo esc_attr(get_option('wrp_remote_shared_secret')); ?>" class="regular-text" autocomplete="off" />
                        <p class="description">Must exactly match the Shared Secret configured on the Mollie Server plugin.</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        <hr />
        <h2>Connection Test</h2>
        <p>Checks the server URL, Shared Secret, currency, and whether a Mollie API key is configured.</p>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <input type="hidden" name="action" value="wrp_mollie_test_connection" />
            <?php wp_nonce_field('wrp_mollie_test_connection'); ?>
            <?php submit_button('Test Connection', 'secondary', 'submit', false); ?>
        </form>
    </div>
    <?php
}

add_action('admin_post_wrp_mollie_test_connection', 'wrp_mollie_test_connection');
function wrp_mollie_test_connection() {
    if (!current_user_can('manage_options')) {
        wp_die('Forbidden', 403);
    }
    check_admin_referer('wrp_mollie_test_connection');

    $server_url = wrp_mollie_configured_server_url();
    $secret = trim((string) get_option('wrp_remote_shared_secret'));
    $result = array('ok' => false, 'message' => 'Payment server settings are incomplete.');

    if ($server_url && strlen($secret) >= 16) {
        $timestamp = time();
        $response = wp_remote_post(wrp_mollie_server_endpoint($server_url, 'wrp_mollie_health'), array(
            'body' => array(
                'request_ts' => $timestamp,
                'signature' => hash_hmac('sha256', 'health|' . $timestamp, $secret),
            ),
            'timeout' => 30,
            'sslverify' => true,
            'redirection' => 3,
            'reject_unsafe_urls' => true,
        ));

        if (is_wp_error($response)) {
            $result['message'] = 'Connection failed: ' . $response->get_error_message();
        } else {
            $status = (int) wp_remote_retrieve_response_code($response);
            $body = trim(wp_remote_retrieve_body($response));
            $data = json_decode($body, true);
            if ($status >= 200 && $status < 300 && is_array($data) && !empty($data['ok'])) {
                $result = array(
                    'ok' => true,
                    'message' => 'Connection successful. Server currency: ' . sanitize_text_field($data['currency']) . '.',
                );
            } else {
                $detail = is_array($data) && !empty($data['message']) ? $data['message'] : wp_strip_all_tags($body);
                $result['message'] = 'Connection failed (HTTP ' . $status . '): ' . substr(sanitize_text_field($detail), 0, 240);
            }
        }
    }

    set_transient('wrp_mollie_test_' . get_current_user_id(), $result, MINUTE_IN_SECONDS);
    wp_safe_redirect(admin_url('admin.php?page=wrp-mollie-client'));
    exit;
}

add_filter('woocommerce_payment_gateways', 'wrp_mollie_add_gateway');
function wrp_mollie_add_gateway($gateways) {
    $gateways[] = 'WC_Mollie_Remote_Payment_Gateway';
    return $gateways;
}

add_action('plugins_loaded', 'wrp_mollie_init_gateway');
function wrp_mollie_init_gateway() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    class WC_Mollie_Remote_Payment_Gateway extends WC_Payment_Gateway {
        public function __construct() {
            $this->id = 'mollie_remote_payment';
            $this->icon = '';
            $this->has_fields = false;
            $this->method_title = 'Mollie Remote Payment';
            $this->method_description = 'Collect payment on a separate WordPress site using Mollie hosted checkout.';
            $this->supports = array('products');

            $this->init_form_fields();
            $this->init_settings();

            $this->title = $this->get_option('title');
            $this->description = $this->get_option('description');
            $this->enabled = $this->get_option('enabled');

            add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'process_admin_options'));
        }

        public function init_form_fields() {
            $this->form_fields = array(
                'enabled' => array(
                    'title' => 'Enable/Disable',
                    'label' => 'Enable Mollie Remote Payment',
                    'type' => 'checkbox',
                    'default' => 'no',
                ),
                'title' => array(
                    'title' => 'Title',
                    'type' => 'text',
                    'default' => 'Credit / Debit Card',
                    'desc_tip' => true,
                ),
                'description' => array(
                    'title' => 'Description',
                    'type' => 'textarea',
                    'default' => 'Pay securely via our payment provider.',
                ),
            );
        }

        public function payment_fields() {
            if ($this->description) {
                echo wpautop(wp_kses_post($this->description));
            }
        }

        public function process_payment($order_id) {
            $order = wc_get_order($order_id);
            if (!$order) {
                wc_add_notice(__('Unable to load the order.', 'wrp-mollie'), 'error');
                return array('result' => 'failure');
            }

            $server_url = wrp_mollie_configured_server_url();
            $secret = trim((string) get_option('wrp_remote_shared_secret'));

            if (!$server_url || !wp_http_validate_url($server_url) || strlen($secret) < 16) {
                wc_add_notice(__('Payment gateway is not configured correctly. Please contact support.', 'wrp-mollie'), 'error');
                return array('result' => 'failure');
            }

            $items = array();
            foreach ($order->get_items() as $item) {
                $quantity = max(1, (int) $item->get_quantity());
                $items[] = array(
                    'product_id' => (int) $item->get_product_id(),
                    'name' => sanitize_text_field($item->get_name()),
                    'qty' => $quantity,
                    'line_total' => number_format((float) $item->get_total(), 2, '.', ''),
                );
            }

            $items_json = wp_json_encode($items);
            $amount = number_format((float) $order->get_total(), 2, '.', '');
            $currency = strtoupper($order->get_currency());
            $callback_url = home_url('/wc-api/processmollieremotepayment');
            $return_url = $this->get_return_url($order);
            $cancel_url = $order->get_checkout_payment_url();
            $request_ts = time();
            $request_nonce = wp_generate_password(20, false, false);

            $signature_payload = implode('|', array(
                (string) $order_id,
                (string) $request_ts,
                (string) $request_nonce,
                (string) $callback_url,
                (string) $return_url,
                (string) $cancel_url,
                (string) $amount,
                (string) $currency,
                (string) WRP_MOLLIE_PAYMENT_DESCRIPTION,
                hash('sha256', $items_json),
            ));

            $order_data = array(
                'callback_url' => $callback_url,
                'return_url' => $return_url,
                'cancel_url' => $cancel_url,
                'order_id' => $order_id,
                'amount' => $amount,
                'currency' => $currency,
                'product_name' => WRP_MOLLIE_PAYMENT_DESCRIPTION,
                'items_json' => $items_json,
                'request_ts' => $request_ts,
                'request_nonce' => $request_nonce,
                'signature' => hash_hmac('sha256', $signature_payload, $secret),
            );

            $response = wp_remote_post(wrp_mollie_server_endpoint($server_url, 'ro'), array(
                'method' => 'POST',
                'body' => $order_data,
                'timeout' => 45,
                'sslverify' => true,
                'redirection' => 3,
                'reject_unsafe_urls' => true,
            ));

            if (is_wp_error($response)) {
                $order->add_order_note('Mollie remote payment server error: ' . $response->get_error_message());
                wc_add_notice(__('Unable to connect to the payment server. Please try again.', 'wrp-mollie'), 'error');
                return array('result' => 'failure');
            }

            $status = (int) wp_remote_retrieve_response_code($response);
            $response_body = trim(wp_remote_retrieve_body($response));
            $redirect_url = $response_body;
            if ($status < 200 || $status >= 300 || !$redirect_url || !wp_http_validate_url($redirect_url)) {
                $detail = substr(sanitize_text_field(wp_strip_all_tags($response_body)), 0, 300);
                $order->add_order_note('Mollie remote payment server returned an invalid response. HTTP ' . $status . ($detail !== '' ? ' - ' . $detail : ''));
                $message = __('Unable to start the payment. Please try again.', 'wrp-mollie');
                if (current_user_can('manage_woocommerce') && $detail !== '') {
                    $message .= ' Server response: ' . $detail;
                }
                wc_add_notice($message, 'error');
                return array('result' => 'failure');
            }

            $order->update_status('on-hold', __('Awaiting Mollie payment.', 'wrp-mollie'));

            return array(
                'result' => 'success',
                'redirect' => esc_url_raw($redirect_url),
            );
        }
    }
}

add_action('woocommerce_api_processmollieremotepayment', 'wrp_mollie_process_client_callback');
function wrp_mollie_process_client_callback() {
    $order_id = isset($_POST['order_id']) ? absint($_POST['order_id']) : 0;
    $txn_id = isset($_POST['txn_id']) ? sanitize_text_field(wp_unslash($_POST['txn_id'])) : '';
    $price = isset($_POST['price']) ? number_format((float) wp_unslash($_POST['price']), 2, '.', '') : '';
    $currency = isset($_POST['currency_code']) ? strtoupper(sanitize_text_field(wp_unslash($_POST['currency_code']))) : '';
    $payment_status = isset($_POST['payment_status']) ? sanitize_text_field(wp_unslash($_POST['payment_status'])) : '';
    $callback_ts = isset($_POST['callback_ts']) ? (int) $_POST['callback_ts'] : 0;
    $signature = isset($_POST['signature']) ? sanitize_text_field(wp_unslash($_POST['signature'])) : '';
    $secret = (string) get_option('wrp_remote_shared_secret');

    if (!$order_id || !$txn_id || $payment_status !== 'paid' || strlen($secret) < 16) {
        status_header(400);
        exit;
    }

    if ($callback_ts < (time() - 900) || $callback_ts > (time() + 300)) {
        status_header(403);
        exit;
    }

    $expected = hash_hmac('sha256', implode('|', array((string) $order_id, $txn_id, $price, $currency, (string) $callback_ts)), $secret);
    if ($signature === '' || !hash_equals($expected, $signature)) {
        status_header(403);
        exit;
    }

    $order = wc_get_order($order_id);
    if (!$order) {
        status_header(404);
        exit;
    }

    $expected_total = number_format((float) $order->get_total(), 2, '.', '');
    $expected_currency = strtoupper($order->get_currency());
    if ($price !== $expected_total || $currency !== $expected_currency) {
        $order->add_order_note('Mollie callback rejected because amount or currency did not match the WooCommerce order.');
        status_header(409);
        exit;
    }

    if ($order->is_paid()) {
        status_header(200);
        echo 'OK';
        exit;
    }

    $order->payment_complete($txn_id);
    $order->add_order_note('Mollie remote payment confirmed. Transaction ID: ' . $txn_id);

    status_header(200);
    echo 'OK';
    exit;
}
