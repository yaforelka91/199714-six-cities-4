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
      .map((offer) => offer.city.name)
      .map((cityObject) => JSON.stringify(cityObject))
      )]
      .map((cityString) => JSON.parse(cityString));
    }
);

export const getNearestOffers = (state) => {
  return state[NAME_SPACE].nearOffers;
};

export const getLoadingStatus = (state) => {
  return state[NAME_SPACE].isLoading;
};

export const getError = (state) => {
  return state[NAME_SPACE].errorType;
};
