import {extend} from '../../utils';
import adaptUser from '../../adapters/user';
import adaptError from '../../adapters/error';
import {Operation as DataOperation} from '../data/data';
import {Error} from '../../api';

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
  CATCH_SERVER_ERROR: `CATCH_SERVER_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  setUserData: (authData) => ({
    type: ActionType.SET_USER_DATA,
    payload: authData,
  }),
  changeProgressStatus: (isLoaded) => ({
    type: ActionType.CHANGE_PROGRESS_STATUS,
    payload: isLoaded,
  }),
  catchServerError: (errorMessage) => ({
    type: ActionType.CATCH_SERVER_ERROR,
    payload: errorMessage,
  }),
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

    case ActionType.CATCH_SERVER_ERROR:
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
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(adaptUser(response.data)));
        dispatch(ActionCreator.changeProgressStatus(false));
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
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(adaptUser(response.data)));
        dispatch(ActionCreator.catchServerError(``));
        dispatch(DataOperation.loadOffers());
        dispatch(ActionCreator.changeProgressStatus(false));
      })
      .catch((err) => {
        if (err.response.status === Error.BAD_REQUEST) {
          dispatch(ActionCreator.catchServerError(adaptError(err.response.data.error)));
          dispatch(ActionCreator.changeProgressStatus(false));
          return;
        }
        dispatch(ActionCreator.changeProgressStatus(false));
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
