import { useState, type FocusEvent } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

interface SelectOption {
  label: string
  value: string
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  className?: string
  control: Control<TFieldValues>
  disabled?: boolean
  error?: boolean
  id?: string
  name: FieldPath<TFieldValues>
  options: readonly SelectOption[]
  placeholder?: string
}

export function SelectField<TFieldValues extends FieldValues>({
  className,
  control,
  disabled = false,
  error = false,
  id,
  name,
  options,
  placeholder = '請選擇',
}: SelectFieldProps<TFieldValues>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOption = options.find((option) => option.value === field.value);
        const listboxId = id ? `${id}-listbox` : undefined;

        const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
          }

          setIsOpen(false);
          field.onBlur();
        };

        return (
          <div className="relative" onBlur={handleBlur}>
            <button
              ref={field.ref}
              aria-controls={listboxId}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-invalid={error || undefined}
              className={cn(
                'flex h-12 w-full items-center justify-between rounded-lg border border-[#E1E1E1] bg-[#F5F5F5] px-3 text-sm outline-none transition',
                'focus-visible:border-primary',
                error && 'border-[#FE2525] focus-visible:border-[#FE2525]',
                disabled && 'cursor-not-allowed opacity-60',
                className,
              )}
              disabled={disabled}
              id={id}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
            >
              <span
                className={cn(
                  'truncate text-left font-medium',
                  selectedOption ? 'text-[#2F2F2F]' : 'text-[#B9B9B9]',
                )}
              >
                {selectedOption?.label ?? placeholder}
              </span>

              <svg
                aria-hidden="true"
                className={cn(
                  'h-4 w-4 shrink-0 text-primary transition',
                  isOpen && 'rotate-180',
                )}
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 6.5L8 10.5L12 6.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </button>

            {isOpen ? (
              <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-lg border border-[#E1E1E1] bg-white p-2 shadow">
                <div
                  aria-labelledby={id}
                  id={listboxId}
                  role="listbox"
                  className="space-y-1"
                >
                  {options.map((option) => {
                    const isSelected = option.value === field.value;

                    return (
                      <button
                        key={option.value}
                        aria-selected={isSelected}
                        className={cn(
                          'w-full rounded-lg px-4 py-3 text-left text-sm font-medium outline-none transition cursor-pointer',
                          'focus-visible:bg-[#FBEFF4]',
                          isSelected
                            ? 'bg-[#F8E6EF] text-[#2F2F2F]'
                            : 'text-[#2F2F2F] hover:bg-[#FBEFF4]',
                        )}
                        role="option"
                        type="button"
                        onClick={() => {
                          field.onChange(option.value);
                          field.onBlur();
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        );
      }}
    />
  );
}
