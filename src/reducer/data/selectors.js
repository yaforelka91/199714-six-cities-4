import NameSpace from '../name-space.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offersList;
};

export const getCities = createSelector(
    getOffers,
    (offers) => {
      return [...new Set(offers
      .map((offer) => offer.city)
      .map((cityObject) => JSON.stringify(cityObject))
      )]
      .map((cityString) => JSON.parse(cityString));
    }
);

export const getError = (state) => {
  return state[NAME_SPACE].error;
};