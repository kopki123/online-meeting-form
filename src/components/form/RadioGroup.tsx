import {
  Controller,
  type Control,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

interface RadioOption<TValue extends string | boolean> {
  label: string
  value: TValue
}

interface RadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends string | boolean,
> {
  control: Control<TFieldValues>
  defaultValue?: FieldPathValue<TFieldValues, TName>
  error?: boolean
  name: TName
  options: readonly RadioOption<TValue>[]
  orientation?: 'horizontal' | 'vertical'
}

export function RadioGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TValue extends string | boolean,
>({
  control,
  defaultValue,
  error = false,
  name,
  options,
  orientation = 'horizontal',
}: RadioGroupProps<TFieldValues, TName, TValue>) {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => {
        const selectedValue = field.value ?? defaultValue;

        return (
          <div
            aria-invalid={error || undefined}
            className={cn(
              'flex flex-wrap gap-x-12 gap-y-3',
              orientation === 'vertical' && 'flex-col gap-3',
            )}
          >
            {options.map((option, index) => {
              const checked = selectedValue === option.value;

              return (
                <label
                  key={String(option.value)}
                  className="group inline-flex items-center gap-3 cursor-pointer"
                >
                  <input
                    ref={index === 0 ? field.ref : undefined}
                    checked={checked}
                    className="peer sr-only"
                    name={field.name}
                    type="radio"
                    value={String(option.value)}
                    onBlur={field.onBlur}
                    onChange={() => field.onChange(option.value)}
                  />

                  <span
                    className={cn(
                      'flex shrink-0 items-center justify-center h-5 w-5 rounded-full border bg-[#F5F5F5] transition',
                      error
                        ? 'border-[#FE2525] bg-[#FFF6F7] group-hover:border-[#FE2525]'
                        : 'group-hover:border-primary',
                      checked && 'border-primary',
                      !checked && 'border-[#E1E1E1]',
                    )}
                  >
                    <span
                      className={cn(
                        'h-3.5 w-3.5 rounded-full bg-primary opacity-0 transition',
                        checked && 'opacity-100',
                      )}
                    />
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
