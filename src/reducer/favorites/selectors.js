import NameSpace from '../name-space';
import {createSelector} from 'reselect';
import {getOffers} from '../data/selectors';

const NAME_SPACE = NameSpace.FAVORITES;

export const getFavorites = (state) => state[NAME_SPACE].favoriteList;

export const getFavoriteOffers = createSelector(
    getOffers,
    getFavorites,
    (allOffers, favoriteOffers) => {
      const reducedFavoriteOffers = favoriteOffers.map((offer) => offer.isFavorite);

      return allOffers.filter((offer) => reducedFavoriteOffers.includes(offer.isFavorite));
    }
);

export const getGroupedCities = createSelector(
    getFavoriteOffers,
    (offers) => [...new Set(
        offers
      .map((offer) => offer.city.name)
      .map((cityObject) => JSON.stringify(cityObject))
    )].map((cityString) => JSON.parse(cityString))
);

export const getGroupedFavoriteOffers = createSelector(
    getGroupedCities,
    getFavoriteOffers,
    (cities, offers) => cities.map((city) => ({
      [city]: offers.filter((offer) => offer.city.name === city)
    }))
);
