/**
 * Order field configuration — Document 10.03
 * Field definitions are service-driven; forms never hardcode per-service UIs.
 */

export type OrderFieldType =
  | 'text'
  | 'username'
  | 'url'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'textarea';

export type OrderFieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  /** Exact non-empty line count for custom-comments (usually package quantity). */
  exactLineCount?: number;
  /** Max characters per non-empty line for custom-comments. */
  maxLineLength?: number;
  /** Built-in validators resolved in lib/order/validation. */
  rules?: Array<
    | 'username'
    | 'url'
    | 'instagram-url'
    | 'tiktok-url'
    | 'facebook-url'
    | 'facebook-post-url'
    | 'youtube-channel-url'
    | 'youtube-video-url'
    | 'email'
    | 'required'
    | 'custom-comments'
  >;
};

export type OrderFieldOption = {
  value: string;
  label: string;
};

export type OrderFieldDefinition = {
  id: string;
  name: string;
  label: string;
  type: OrderFieldType;
  placeholder?: string;
  helpText?: string;
  optional?: boolean;
  validation?: OrderFieldValidation;
  options?: OrderFieldOption[];
};

export type ServiceOrderConfig = {
  serviceId?: string;
  serviceSlug?: string;
  /** Prefer category when service-specific config is absent. */
  category?: string;
  fields: OrderFieldDefinition[];
};

export type OrderConfigurationValues = Record<string, string | boolean | number>;

export type FieldValidationError = {
  fieldId: string;
  message: string;
};
