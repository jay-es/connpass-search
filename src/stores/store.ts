import { combineReducers, createStore } from 'redux';
import form, { FormState, STORAGE_CITIES } from './form';

export type RootState = {
  form: FormState;
};

const devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line

const store = createStore(
  combineReducers<RootState>({
    form,
  }),
  process.env.NODE_ENV === 'development' && devtools && devtools(),
);

// cities が変わったら保存
let oldCities = store.getState().form.cities;
store.subscribe(() => {
  const newCities = store.getState().form.cities;

  // 変更がなければ終了
  if (newCities === oldCities) {
    return;
  }

  localStorage.setItem(STORAGE_CITIES, JSON.stringify(newCities));
  oldCities = newCities;
});

export default store;
