import NameSpace from '../name-space.js';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offersList;
};

export const getCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getError = (state) => {
  return state[NAME_SPACE].error;
};
