import { atom } from 'recoil';

export type EventInfo = {
  title: string;
  catch: string;
  started_at: string;
  ended_at: string;
  place: string;
  address: string;
  event_url: string;
  accepted: number;
  waiting: number;
  limit: number | null;
  updated_at: string;
};
export type ResultsState = {
  events: EventInfo[];
  results_available: number; // 検索結果の総件数
  results_returned: number; // 含まれる検索結果の件数
  results_start: number; // 検索の開始位置
};

export const RESULTS_STORAGE = 'results_data';

export const resultsState = atom<ResultsState>({
  key: 'resultsState',
  default: {
    events: [],
    results_available: 0,
    results_returned: 0,
    results_start: 0,
  },
});
