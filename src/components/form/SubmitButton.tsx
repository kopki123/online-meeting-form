import buttonHoverImage from '@/assets/button-hover.webp';
import buttonImage from '@/assets/button.webp';
import { cn } from '@/lib/utils';

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

interface SubmitButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
}

export function SubmitButton({
  children,
  className,
  disabled,
  style,
  type = 'submit',
  ...props
}: SubmitButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'h-20 w-72 max-w-full rounded-none border-0 bg-transparent bg-center bg-no-repeat [background-image:var(--button-bg)] shadow-none transition-transform hover:cursor-pointer hover:bg-transparent hover:[background-image:var(--button-hover-bg)] disabled:pointer-events-none disabled:opacity-70',
        className,
      )}
      disabled={disabled}
      type={type}
      style={{
        '--button-bg': `url(${buttonImage})`,
        '--button-hover-bg': `url(${buttonHoverImage})`,
        backgroundSize: '100% 100%',
        ...style,
      } as CSSProperties}
    >
      <p className="text-white text-2xl font-semibold tracking-widest">
        {children}
      </p>
    </button>
  );
}
