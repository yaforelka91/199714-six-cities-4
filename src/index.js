import React from 'react';
import reactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {createAPI} from './api';

const init = () => {
  const api = createAPI(() => {});

  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(DataOperation.loadOffers())
  .then(() => {
    reactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>,

        document.querySelector(`#root`)
    );
  });
};

init();
