import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { FORM_STORAGE, FormState, formState } from '../states/form';
import { RESULTS_STORAGE, ResultsState, resultsState } from '../states/results';

async function fetchEvents(formData: FormState, start = 1, save = true): Promise<ResultsState> {
  const { year, month, order, cities, keyword } = formData;
  const params = {
    start,
    order,
    keyword: `東京都,${keyword}`,
    keyword_or: cities.map(v => `東京都${v}`).join(),
    ym: `${year}${month.toString().padStart(2, '0')}`,
  };

  const { data } = await axios.get<ResultsState>('https://connpass.com/api/v1/event/', {
    params,
    adapter: jsonpAdapter,
  });

  if (save) {
    localStorage.setItem(FORM_STORAGE, JSON.stringify(formData));
    localStorage.setItem(RESULTS_STORAGE, JSON.stringify(data));
  }

  return data;
}

type FetchEvents = (start?: number, save?: boolean) => Promise<void>;
export const useFetchEvents = (): FetchEvents => {
  const formData = useRecoilValue(formState);
  const setResults = useSetRecoilState(resultsState);

  return async (start = 1, save = true): Promise<void> => {
    const res = await fetchEvents(formData, start, save);
    setResults(res);
  };
};
