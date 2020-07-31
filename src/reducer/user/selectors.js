import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getAuthorizationProgress = (state) => {
  return state[NAME_SPACE].isAuthorizationInProgress;
};

export const getUserData = (state) => {
  return state[NAME_SPACE].userData;
};

export const getError = (state) => {
  return state[NAME_SPACE].errorType;
};
