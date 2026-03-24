import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import footerImage from '@/assets/footer.webp';
import headerImage from '@/assets/header.webp';
import { CheckboxGroup } from '@/components/form/CheckboxGroup';
import { FormField } from '@/components/form/FormField';
import { RadioGroup } from '@/components/form/RadioGroup';
import { SelectField } from '@/components/form/SelectField';
import { SubmitButton } from '@/components/form/SubmitButton';
import { TextInput } from '@/components/form/TextInput';
import {
  DIET_OPTIONS,
  DINNER_OPTIONS,
  INDUSTRY_OPTIONS,
  SESSION_OPTIONS,
} from '@/features/online-meeting-form/constants';
import { onlineMeetingSchema } from '@/features/online-meeting-form/schema';
import type { OnlineMeetingFormValues } from '@/features/online-meeting-form/types';

const defaultValues: OnlineMeetingFormValues = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  industry: '',
  otherIndustry: '',
  sessions: [],
  attendDinner: null,
  dietType: '',
  otherDiet: '',
};

export function OnlineMeetingForm() {
  const {
    clearErrors,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<OnlineMeetingFormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(onlineMeetingSchema),
  });

  const selectedIndustry = useWatch({ control, name: 'industry' });
  const attendDinner = useWatch({ control, name: 'attendDinner' });
  const dietType = useWatch({ control, name: 'dietType' });

  useEffect(() => {
    if (selectedIndustry === '其他') {
      return;
    }

    setValue('otherIndustry', '');
    clearErrors('otherIndustry');
  }, [clearErrors, selectedIndustry, setValue]);

  useEffect(() => {
    if (attendDinner) {
      return;
    }

    setValue('dietType', '');
    setValue('otherDiet', '');
    clearErrors(['dietType', 'otherDiet']);
  }, [attendDinner, clearErrors, setValue]);

  useEffect(() => {
    if (dietType === '其他') {
      return;
    }

    setValue('otherDiet', '');
    clearErrors('otherDiet');
  }, [clearErrors, dietType, setValue]);

  const onSubmit = (formData: OnlineMeetingFormValues) => {
    console.log(formData);
  };

  return (
    <div className="relative w-full max-w-xl overflow-hidden bg-white">
      <img
        src={headerImage}
        alt=""
        aria-hidden="true"
        className="absolute top-0 w-full pointer-events-none select-none"
      />
      <img
        src={footerImage}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 w-full pointer-events-none select-none"
      />

      <div className="relative flex items-center justify-center mx-auto mt-14 mb-20">
        <h1 className="text-primary text-[42px] font-semibold tracking-widest">
          線上會議報名表
        </h1>
      </div>

      <form
        noValidate
        className="relative flex flex-col justify-center px-6 py-8 sm:px-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-10">
          <FormField
            error={errors.name?.message}
            id="name"
            label="姓名"
            required
          >
            <TextInput
              autoComplete="name"
              error={Boolean(errors.name)}
              id="name"
              registration={register('name')}
            />
          </FormField>

          <FormField
            error={errors.email?.message}
            id="email"
            label="常用信箱"
            required
          >
            <TextInput
              autoComplete="email"
              error={Boolean(errors.email)}
              id="email"
              registration={register('email')}
              type="email"
            />
          </FormField>

          <FormField
            error={errors.phone?.message}
            id="phone"
            label="手機號碼"
            required
          >
            <TextInput
              autoComplete="tel"
              error={Boolean(errors.phone)}
              id="phone"
              inputMode="tel"
              registration={register('phone')}
            />
          </FormField>

          <FormField
            error={errors.organization?.message}
            id="organization"
            label="服務單位"
            required
          >
            <TextInput
              error={Boolean(errors.organization)}
              id="organization"
              registration={register('organization')}
            />
          </FormField>

          <div className="space-y-3">
            <FormField
              error={errors.industry?.message}
              id="industry"
              label="工作產業類別"
              required
            >
              <SelectField
                control={control}
                error={Boolean(errors.industry)}
                id="industry"
                name="industry"
                options={INDUSTRY_OPTIONS}
              />
            </FormField>

            {selectedIndustry === '其他' ? (
              <FormField
                error={errors.otherIndustry?.message}
                id="otherIndustry"
                required
              >
                <TextInput
                  error={Boolean(errors.otherIndustry)}
                  id="otherIndustry"
                  placeholder="請填寫"
                  registration={register('otherIndustry')}
                />
              </FormField>
            ) : null}
          </div>

          <FormField
            error={errors.sessions?.message}
            label="欲參與的會議場次（複選題）"
            required
          >
            <CheckboxGroup
              control={control}
              error={Boolean(errors.sessions)}
              name="sessions"
              options={SESSION_OPTIONS}
            />
          </FormField>

          <FormField
            error={errors.attendDinner?.message}
            label="是否參與晚宴"
            required
          >
            <RadioGroup
              control={control}
              defaultValue={defaultValues.attendDinner}
              error={Boolean(errors.attendDinner)}
              name="attendDinner"
              options={DINNER_OPTIONS}
            />
          </FormField>

          {attendDinner ? (
            <div className="space-y-3.5">
              <FormField
                error={errors.dietType?.message}
                label="飲食習慣"
                required
              >
                <RadioGroup
                  control={control}
                  defaultValue={defaultValues.dietType}
                  error={Boolean(errors.dietType)}
                  name="dietType"
                  options={DIET_OPTIONS}
                />
              </FormField>

              {dietType === '其他' ? (
                <FormField
                  error={errors.otherDiet?.message}
                  id="otherDiet"
                  required
                >
                  <TextInput
                    error={Boolean(errors.otherDiet)}
                    id="otherDiet"
                    placeholder="請填寫"
                    registration={register('otherDiet')}
                  />
                </FormField>
              ) : null}
            </div>
          ) : null}
        </div>

        <SubmitButton
          disabled={isSubmitting}
          className="mx-auto mt-13 mb-26"
        >
          馬上報名
        </SubmitButton>
      </form>
    </div>
  );
}
