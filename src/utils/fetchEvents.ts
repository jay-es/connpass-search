import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import store from '../stores/store';
import { FORM_STORAGE } from '../stores/form';
import { RESULTS_STORAGE, setResults, ResultsState } from '../stores/results';

export default async function fetchEvents(start = 1, save = true): Promise<void> {
  const formData = store.getState().form;
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
  store.dispatch(setResults(data));

  if (save) {
    localStorage.setItem(FORM_STORAGE, JSON.stringify(formData));
    localStorage.setItem(RESULTS_STORAGE, JSON.stringify(data));
  }
}

// 初回訪問時、自動的にデータ取得
if (!localStorage.getItem(FORM_STORAGE)) {
  fetchEvents(1, false);
}
