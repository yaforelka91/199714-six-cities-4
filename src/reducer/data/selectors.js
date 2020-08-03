import NameSpace from '../name-space.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => state[NAME_SPACE].offersList;

export const getLoadingStatus = (state) => state[NAME_SPACE].isOffersLoading;

export const getNearbyOffers = (state) => state[NAME_SPACE].nearOffers;

export const getCities = createSelector(
    getOffers,
    (offers) => [...new Set(
        offers
      .map((offer) => offer.city.name)
      .map((cityObject) => JSON.stringify(cityObject))
    )].map((cityString) => JSON.parse(cityString))
);

export const getNearestOffers = createSelector(
    getOffers,
    getNearbyOffers,
    (allOffers, nearbyOffers) => {
      const reducedNearbyOffers = nearbyOffers.map((offer) => offer.id);

      return allOffers.filter((offer) => reducedNearbyOffers.includes(offer.id));
    }
);

export const getError = (state) => state[NAME_SPACE].errorType;
