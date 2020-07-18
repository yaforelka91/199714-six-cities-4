import {extend} from '../../utils.js';
import adaptUser from '../../adapters/user.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userData: {},
  review: [],
  errorType: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_DATA: `SET_USER_DATA`,
  SEND_REVIEW: `SEND_REVIEW`,
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
  sendReview: (reviewData) => {
    return {
      type: ActionType.SEND_REVIEW,
      payload: reviewData,
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

    case ActionType.SEND_REVIEW:
      return extend(state, {
        review: action.payload,
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
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(adaptUser(response.data)));
      })
      .catch((err) => {
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
        dispatch(ActionCreator.catchError(``));
      })
      .catch((err) => {
        const errorMsg = err.response.data.error.match(/\[(.*?)\]/)[1];
        dispatch(ActionCreator.catchError(errorMsg));
      });
  },
  sendComment: (commentData, hotelId) => (dispatch, getState, api) => {
    return api.post(`/comments/${hotelId}`, {
      comment: commentData.comment,
      rating: commentData.rating,
    })
      .then((response) => {
        dispatch(ActionCreator.sendReview(response.data));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.catchError(``));
      })
    .catch((err) => {
      let errorMsg = ``;
      if (err.response.status === 401) {
        errorMsg = err.response.data.error;
        dispatch(ActionCreator.catchError(errorMsg));
      }

      if (err.response.status === 400) {
        errorMsg = err.response.data.error.match(/\[(.*?)\]/)[1];
        dispatch(ActionCreator.catchError(errorMsg));
      }
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
