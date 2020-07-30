import NameSpace from '../name-space.js';
import {getOffers} from '../data/selectors.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.CATALOG;

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
