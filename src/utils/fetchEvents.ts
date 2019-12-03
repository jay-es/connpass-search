import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import store from '../stores/store';
import { FORM_STORAGE } from '../stores/form';
import { RESULTS_STORAGE, setResults } from '../stores/results';

export default function fetchEvents(start = 1): Promise<void> {
  const { year, month, cities, keyword } = store.getState().form;
  const params = {
    start,
    keyword: `東京都,${keyword}`,
    keyword_or: cities.join(','),
    order: 2,
    ym: `${year}${month.toString().padStart(2, '0')}`,
  };

  return axios({
    params,
    adapter: jsonpAdapter,
    url: 'https://connpass.com/api/v1/event/',
  }).then(res => {
    store.dispatch(setResults(res.data));

    localStorage.setItem(FORM_STORAGE, JSON.stringify(store.getState().form));
    localStorage.setItem(RESULTS_STORAGE, JSON.stringify(store.getState().results));
  });
}
