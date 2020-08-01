import {extend} from '../../utils.js';
import adaptUser from '../../adapters/user.js';
import adaptError from '../../adapters/error.js';
import {Operation as DataOperation} from '../data/data.js';
import {Error} from '../../api.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userData: {},
  isAuthorizationInProgress: true,
  errorType: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_DATA: `SET_USER_DATA`,
  CHANGE_PROGRESS_STATUS: `CHANGE_PROGRESS_STATUS`,
  CATCH_ERROR: `CATCH_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setUserData: (authData) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: authData,
    };
  },
  changeProgressStatus: (isLoaded) => {
    return {
      type: ActionType.CHANGE_PROGRESS_STATUS,
      payload: isLoaded,
    };
  },
  catchError: (errorMessage) => {
    return {
      type: ActionType.CATCH_ERROR,
      payload: errorMessage,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SET_USER_DATA:
      return extend(state, {
        userData: action.payload,
      });

    case ActionType.CHANGE_PROGRESS_STATUS:
      return extend(state, {
        isAuthorizationInProgress: action.payload,
      });

    case ActionType.CATCH_ERROR:
      return extend(state, {
        errorType: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.changeProgressStatus(false));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(adaptUser(response.data)));
      })
      .catch((err) => {
        dispatch(ActionCreator.changeProgressStatus(false));
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.changeProgressStatus(false));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(adaptUser(response.data)));
        dispatch(ActionCreator.catchError(``));
        dispatch(DataOperation.loadOffers());
      })
      .catch((err) => {
        dispatch(ActionCreator.changeProgressStatus(false));

        if (err.response.status === Error.BAD_REQUEST) {
          dispatch(ActionCreator.catchError(adaptError(err.response.data.error)));
          return;
        }

        throw err;
      });
  },
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
