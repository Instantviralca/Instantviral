import { HowItWorks, type HowItWorksProps } from '@/components/marketing/how-it-works';

export type ProcessProps = HowItWorksProps;

/** Service process section — reuses HowItWorks structure. */
export function Process(props: ProcessProps) {
  return <HowItWorks {...props} className={props.className} />;
}
