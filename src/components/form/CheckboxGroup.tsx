import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

interface CheckboxOption<TValue extends string> {
  label: string
  value: TValue
}

interface CheckboxGroupProps<
  TFieldValues extends FieldValues,
  TValue extends string,
> {
  control: Control<TFieldValues>
  error?: boolean
  name: FieldPath<TFieldValues>
  options: readonly CheckboxOption<TValue>[]
}

export function CheckboxGroup<
  TFieldValues extends FieldValues,
  TValue extends string,
>({
  control,
  error = false,
  name,
  options,
}: CheckboxGroupProps<TFieldValues, TValue>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedValues = Array.isArray(field.value)
          ? (field.value as string[])
          : [];

        const toggleValue = (value: string) => {
          const nextValue = selectedValues.includes(value)
            ? selectedValues.filter((item) => item !== value)
            : [...selectedValues, value];

          field.onChange(nextValue);
        };

        return (
          <div aria-invalid={error || undefined} className="space-y-3">
            {options.map((option, index) => {
              const checked = selectedValues.includes(option.value);

              return (
                <label
                  key={option.value}
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  <input
                    checked={checked}
                    className="peer sr-only"
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={() => toggleValue(option.value)}
                    ref={index === 0 ? field.ref : undefined}
                    type="checkbox"
                    value={option.value}
                  />

                  <span
                    className={cn(
                      'flex shrink-0 items-center justify-center h-5 w-5 rounded-sm border transition',
                      error
                        ? 'border-[#FE2525] bg-[#FFF6F7] group-hover:border-[#FE2525]'
                        : 'group-hover:border-primary',
                      checked && 'border-primary bg-primary',
                      !checked && 'border-[#E1E1E1] bg-[#F5F5F5]',
                    )}
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke={checked ? 'white' : 'transparent'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </span>

                  <span className="text-sm font-medium">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        );
      }}
    />
  );
}
