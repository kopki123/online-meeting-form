import { cn } from '@/lib/utils';

import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean
  registration: UseFormRegisterReturn
}

export function TextInput({
  className,
  error = false,
  registration,
  ...props
}: TextInputProps) {
  return (
    <input
      {...registration}
      {...props}
      aria-invalid={error || undefined}
      className={cn(
        'h-12 w-full p-3 rounded-lg border border-[#E1E1E1] bg-[#F5F5F5] text-[#3E3E3E] text-sm font-medium outline-none transition placeholder:text-[#B9B9B9] focus:border-primary',
        error && 'border-[#FE2525] focus:border-[#FE2525]',
        className,
      )}
    />
  );
}
