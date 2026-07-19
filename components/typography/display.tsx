import { cn } from '@/lib/utils';
import { Heading, type HeadingProps } from '@/components/typography/heading';

export interface DisplayHeadingProps extends Omit<HeadingProps, 'size' | 'as'> {
  as?: 'h1' | 'h2';
}

export function DisplayHeading({ as = 'h1', className, ...props }: DisplayHeadingProps) {
  return <Heading as={as} size="display" className={cn(className)} {...props} />;
}
