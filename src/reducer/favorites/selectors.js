import NameSpace from '../name-space.js';
import {createSelector} from 'reselect';
import {getOffers} from '../data/selectors.js';

const NAME_SPACE = NameSpace.FAVORITES;

export const getFavorites = (state) => {
  return state[NAME_SPACE].favoriteList;
};

export const getFavoriteOffers = createSelector(
    getOffers,
    getFavorites,
    (allOffers, favoriteOffers) => {
      const reducedFavoriteOffers = favoriteOffers.map((offer) => offer.isFavorite);

      return allOffers.filter((offer) => {
        return reducedFavoriteOffers.includes(offer.isFavorite);
      });
    }
);

export const getGroupedCities = createSelector(
    getFavoriteOffers,
    (offers) => {
      return [...new Set(offers
  .map((offer) => offer.city.name)
  .map((cityObject) => JSON.stringify(cityObject))
      )]
  .map((cityString) => JSON.parse(cityString));
    }
);

export const getGroupedFavoriteOffers = createSelector(
    getGroupedCities,
    getFavoriteOffers,
    (cities, offers) => {
      return cities.map((city) => {
        return {
          [city]: offers.filter((offer) => {
            return offer.city.name === city;
          }),
        };
      });
    }
);
