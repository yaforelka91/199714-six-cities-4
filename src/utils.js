import {createSelector} from 'reselect';
import {SortType, CardView, MONTHS_LIST} from './const.js';

export const extend = (object1, object2) => {
  return Object.assign({}, object1, object2);
};

export const sortOffers = (sortType, offers) => {
  switch (sortType) {
    case SortType.POPULAR:
      return offers.slice();
    case SortType.TO_HIGH:
      return offers.slice().sort((prevOffer, nextOffer) => prevOffer.price - nextOffer.price);
    case SortType.TO_LOW:
      return offers.slice().sort((prevOffer, nextOffer) => nextOffer.price - prevOffer.price);
    case SortType.TOP_RATED:
      return offers.slice().sort((prevOffer, nextOffer) => nextOffer.rating - prevOffer.rating);
    default:
      return offers;
  }
};

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getFormattedDate = (dateStr, isFull) => {
  const date = new Date(dateStr);
  return isFull ? dateStr.match(/([^T]+)/)[0] : `${MONTHS_LIST[date.getMonth()]} ${date.getFullYear()}`;
};

export const getSortedOffers = createSelector(
    (state) => {
      return state.sortType;
    },
    (state) => {
      return state.offers;
    },
    (activeSorting, offers) => {
      return sortOffers(activeSorting, offers);
    }
);

export const getRatingInPercent = (ratingValue, isInteger) => {
  return isInteger ? Math.round(ratingValue) * 100 / 5 : Math.round(ratingValue * 100 / 5);
};

export const getArticleClassName = (viewMode) => {
  switch (viewMode) {
    case CardView.CITIES:
      return {
        classNameForArticle: `cities__place-card`,
        classNameForImage: `cities__image-wrapper`,
        classNameForInfo: ``,
      };

    case CardView.NEAR:
      return {
        classNameForArticle: `near-places__card`,
        classNameForImage: `near-places__image-wrapper`,
        classNameForInfo: ``,
      };

    case CardView.FAVORITES:
      return {
        classNameForArticle: `favorites__card`,
        classNameForImage: `favorites__image-wrapper`,
        classNameForInfo: `favorites__card-info`,
      };
  }

  return {
    classNameForArticle: ``,
    classNameForImage: ``,
    classNameForInfo: ``,
  };
};
