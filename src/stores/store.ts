import { combineReducers, createStore } from 'redux';
import formReducer, { FormState } from './form';
import resultsReducer, { ResultsState } from './results';

export type RootState = {
  form: FormState;
  results: ResultsState;
};

const devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line

const store = createStore(
  combineReducers<RootState>({
    form: formReducer,
    results: resultsReducer,
  }),
  process.env.NODE_ENV === 'development' && devtools && devtools(),
);

export default store;
