import NameSpace from '../name-space.js';
import {getOffers} from '../data/selectors.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.CATALOG;
const MAX_OFFERS_COUNT = 3;

export const getActiveCard = (state) => {
  return state[NAME_SPACE].activeCard;
};

export const getCity = (state) => {
  return state[NAME_SPACE].activeCity;
};

export const getActiveOffer = createSelector(
    getActiveCard,
    getOffers,
    (activeCard, offers) => {
      return offers.find((offer) => offer.id === activeCard) || false;
    }
);

export const getFilteredOffers = createSelector(
    getCity,
    getOffers,
    (city, offers) => {
      return offers.filter((offer) => {
        return offer.city.name === city;
      });
    }
);

export const getNearestOffers = createSelector(
    getActiveCard,
    getFilteredOffers,
    (activeCard, offers) => {
      return offers.filter((offer) => {
        return offer.id !== activeCard;
      }).slice(0, MAX_OFFERS_COUNT);
    }
);
