import { atom } from 'recoil';

export type FormState = {
  year: number;
  month: number;
  order: number;
  cities: string[];
  keyword: string;
};

export const FORM_STORAGE = 'form_data';

export const formState = atom<FormState>({
  key: 'formState',
  default: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    order: 3,
    cities: [],
    keyword: '',
  },
});
