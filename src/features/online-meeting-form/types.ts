import {
  DIET_VALUES,
  INDUSTRY_VALUES,
  SESSION_VALUES,
} from '@/features/online-meeting-form/constants';

export type FormOption<TValue extends string | boolean = string> = {
  label: string
  value: TValue
};

export type IndustryValue = (typeof INDUSTRY_VALUES)[number] | '';
export type SessionValue = (typeof SESSION_VALUES)[number];
export type DinnerAttendanceValue = boolean | null;
export type DietTypeValue = (typeof DIET_VALUES)[number] | '';

export interface OnlineMeetingFormValues {
  name: string
  email: string
  phone: string
  organization: string
  industry: IndustryValue
  otherIndustry: string
  sessions: SessionValue[]
  attendDinner: boolean | null
  dietType: DietTypeValue
  otherDiet: string
}
