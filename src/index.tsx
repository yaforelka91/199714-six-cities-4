import * as React from 'react';
import * as reactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import reducer from './reducer/reducer';
import {Operation as DataOperation} from './reducer/data/data';
import {createAPI} from './api';
import {AuthorizationStatus, ActionCreator, Operation as UserOperation} from './reducer/user/user';
import history from './history';

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

  store.dispatch(UserOperation.checkAuth());
  store.dispatch(DataOperation.loadOffers());

  reactDOM.render(
      <Provider store={store}>
        <App history={history}/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
