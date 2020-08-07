import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => state[NAME_SPACE].authorizationStatus;

export const getAuthorizationProgress = (state) => state[NAME_SPACE].isAuthorizationInProgress;

export const getUserData = (state) => state[NAME_SPACE].userData;

export const getError = (state) => state[NAME_SPACE].errorType;
