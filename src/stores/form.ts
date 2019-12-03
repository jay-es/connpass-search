export const FORM_STORAGE = 'form_data';

// Action Types
const SET_YEAR = 'form/SET_YEAR';
const SET_MONTH = 'form/SET_MONTH';
const SET_CITIES = 'form/SET_CITIES';
const SET_KEYWORD = 'form/SET_KEYWORD';

export type FormState = {
  year: number;
  month: number;
  cities: string[];
  keyword: string;
};

const createInitialState = (): FormState => {
  const storageData = localStorage.getItem(FORM_STORAGE);

  if (storageData) {
    return JSON.parse(storageData);
  }

  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    cities: [],
    keyword: '',
  };
};

const formReducer = (state = createInitialState(), action: FormAction): FormState => {
  switch (action.type) {
    case SET_YEAR:
      return { ...state, year: action.payload };
    case SET_MONTH:
      return { ...state, month: action.payload };
    case SET_CITIES:
      return { ...state, cities: action.payload };
    case SET_KEYWORD:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
};

// Action Creators
type FormAction = SetYearAction | SetMonthAction | SetKeywordAction | SetCitiesAction;
type SetYearAction = { type: typeof SET_YEAR; payload: number };
type SetMonthAction = { type: typeof SET_MONTH; payload: number };
type SetCitiesAction = { type: typeof SET_CITIES; payload: string[] };
type SetKeywordAction = { type: typeof SET_KEYWORD; payload: string };
export const setYear = (payload: number): SetYearAction => ({ type: SET_YEAR, payload });
export const setMonth = (payload: number): SetMonthAction => ({ type: SET_MONTH, payload });
export const setKeyword = (payload: string): SetKeywordAction => ({ type: SET_KEYWORD, payload });
export const setCities = (payload: string[]): SetCitiesAction => ({ type: SET_CITIES, payload });

export default formReducer;
