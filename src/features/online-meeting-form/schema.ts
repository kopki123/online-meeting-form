import { z } from 'zod';

import {
  DIET_VALUES,
  INDUSTRY_VALUES,
  SESSION_VALUES,
} from '@/features/online-meeting-form/constants';

const phonePattern = /^(?=(?:.*\d){8,15}$)[\d+\-\s()]+$/;

const addFieldIssue = (
  ctx: z.RefinementCtx,
  path: 'otherIndustry' | 'dietType' | 'otherDiet',
  message: string,
) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message,
    path: [path],
  });
};

export const onlineMeetingSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, '請輸入姓名'),
    email: z
      .string()
      .trim()
      .min(1, { message: '請輸入 Email' })
      .email('請輸入正確的 Email 格式'),
    phone: z
      .string()
      .trim()
      .min(1, '請輸入手機號碼')
      .regex(phonePattern, '手機號碼格式錯誤')
      .refine((value: string) => value.replace(/[^\d]/g, '').length >= 8, { message: '手機號碼格式錯誤' }),
    industry: z
      .enum(INDUSTRY_VALUES)
      .or(z.literal(''))
      .refine((value) => value !== '', { message: '請選擇工作產業類別' }),
    otherIndustry: z
      .string()
      .trim(),
    organization: z
      .string()
      .trim()
      .min(1, '請輸入服務單位'),
    sessions: z
      .array(z.enum(SESSION_VALUES))
      .min(1, '請至少選擇一個會議場次'),
    attendDinner: z
      .boolean()
      .nullable()
      .refine((value) => value !== null, { message: '請選擇是否參與晚宴' }),
    otherDiet: z
      .string()
      .trim(),
    dietType: z
      .enum(DIET_VALUES)
      .or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.industry === '其他' && !data.otherIndustry) {
      addFieldIssue(ctx, 'otherIndustry', '請填寫產業名稱');
    }

    if (!data.attendDinner) {
      return;
    }

    if (!data.dietType) {
      addFieldIssue(ctx, 'dietType', '請選擇飲食習慣');
    }

    if (data.dietType === '其他' && !data.otherDiet) {
      addFieldIssue(ctx, 'otherDiet', '請填寫其他飲食習慣');
    }
  });
