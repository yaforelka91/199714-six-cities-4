import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.REVIEWS;

export const getError = (state) => {
  return state[NAME_SPACE].errorType;
};
