import NameSpace from '../name-space.js';
import {getAllOffers, getCity} from '../data/selectors.js';
import {sortOffers} from '../../utils.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.CATALOG;

export const getSorting = (state) => {
  return state[NAME_SPACE].activeSorting;
};

export const getActiveCard = (state) => {
  return state[NAME_SPACE].activeCard;
};

export const getFilteredOffers = createSelector(
    getCity,
    getAllOffers,
    (activeCity, offers) => {
      return offers.filter((offer) => {
        return offer.city.name === activeCity.name;
      });
    }
);

export const getSortedOffers = createSelector(
    getSorting,
    getFilteredOffers,
    (sortType, filteredOffers) => {
      return sortOffers(sortType, filteredOffers);
    }
);
