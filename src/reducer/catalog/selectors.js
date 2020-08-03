import NameSpace from '../name-space.js';
import {getOffers} from '../data/selectors.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.CATALOG;

export const getCity = (state) => {
  return state[NAME_SPACE].activeCity;
};

export const getFilteredOffers = createSelector(
    getCity,
    getOffers,
    (city, offers) => {
      return offers.filter((offer) => {
        return offer.city.name === city;
      });
    }
);

export const getCityLocation = createSelector(
    getOffers,
    getCity,
    (offers, city) => {
      return {
        coords: offers.find((offer) => offer.city.name === city).city.coords,
        zoom: offers.find((offer) => offer.city.name === city).city.zoom
      };
    }
);
