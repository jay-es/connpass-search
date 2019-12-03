export const RESULTS_STORAGE = 'results_data';

// Action Types
const SET_RESULTS = 'results/SET_RESULTS';

export type EventInfo = {
  title: string;
  catch: string;
  started_at: string;
  ended_at: string;
  place: string;
  address: string;
  event_url: string;
  accepted: number;
  limit: number | null;
};
export type ResultsState = {
  events: EventInfo[];
  results_available: number; // 検索結果の総件数
  results_returned: number; // 含まれる検索結果の件数
  results_start: number; // 検索の開始位置
};

const createInitialState = (): ResultsState => {
  const storageData = localStorage.getItem(RESULTS_STORAGE);

  if (storageData) {
    return JSON.parse(storageData);
  }

  return {
    events: [],
    results_available: 0,
    results_returned: 0,
    results_start: 0,
  };
};

const resultsReducer = (state = createInitialState(), action: ResultsAction): ResultsState => {
  switch (action.type) {
    case SET_RESULTS:
      return action.payload;
    default:
      return state;
  }
};

// Action Creators
type ResultsAction = SetResultsAction;
type SetResultsAction = { type: typeof SET_RESULTS; payload: ResultsState };
export const setResults = (payload: ResultsState): SetResultsAction => ({
  type: SET_RESULTS,
  payload,
});

export default resultsReducer;
