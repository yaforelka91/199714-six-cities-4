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
import {AuthorizationStatus, ActionCreator, Operation as UserOperation} from './reducer/user/user.js';

const init = () => {
  const onUnauthorized = () => {
    store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  };

  const api = createAPI(onUnauthorized);

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
  })
  .then(() => {
    store.dispatch(UserOperation.checkAuth());
  });
};

init();
