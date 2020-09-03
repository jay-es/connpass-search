import { RecoilRootProps } from 'recoil';
import { FORM_STORAGE, formState } from '../states/form';
import { RESULTS_STORAGE, resultsState } from '../states/results';

const formStorage = localStorage.getItem(FORM_STORAGE);
const resultStorage = localStorage.getItem(RESULTS_STORAGE);
export const isFirstVisit = !formStorage;

// 保存されていたら復元
export const initStates: RecoilRootProps['initializeState'] = snapshot => {
  if (formStorage) {
    snapshot.set(formState, JSON.parse(formStorage));
  }

  if (resultStorage) {
    snapshot.set(resultsState, JSON.parse(resultStorage));
  }
};
