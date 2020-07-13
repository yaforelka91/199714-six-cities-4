import NameSpace from '../name-space.js';
import adaptOffers from '../../adapters/offers.js';
import adaptCity from '../../adapters/city.js';

const NAME_SPACE = NameSpace.DATA;

export const getAllOffers = (state) => {
  return adaptOffers(state[NAME_SPACE].offersList);
};

export const getCity = (state) => {
  return adaptCity(state[NAME_SPACE].city);
};
