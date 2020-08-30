import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import store from './stores/store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initStates } from './utils/initStates';

ReactDOM.render(
  <Provider store={store}>
    <RecoilRoot initializeState={initStates}>
      <App />
    </RecoilRoot>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
