import NameSpace from '../name-space.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.DATA;
const MAX_NEARBY_COUNT = 3;

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

export const getNearbyOffers = (state) => {
  return state[NAME_SPACE].nearOffers.slice(0, MAX_NEARBY_COUNT);
};

export const getNearestOffers = createSelector(
    getOffers,
    getNearbyOffers,
    (allOffers, nearbyOffers) => {
      const reducedNearbyOffers = nearbyOffers.map((offer) => offer.id);

      return allOffers.filter((offer) => {
        return reducedNearbyOffers.includes(offer.id);
      });
    }
);

export const getError = (state) => {
  return state[NAME_SPACE].errorType;
};
