import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

interface FormFieldProps {
  children: ReactNode
  className?: string
  error?: string
  id?: string
  label?: string
  required?: boolean
}

export function FormField({
  children,
  className,
  error,
  id,
  label,
  required = false,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {label ? (
        <label
          htmlFor={id}
          className="block text-primary font-medium cursor-pointer"
        >
          {label}
          {required ? <span className="ml-1">*</span> : null}
        </label>
      ) : null}
      <div className="space-y-2">
        {children}
        {error ? (
          <p className="text-[#FE2525] text-xs text-right">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
