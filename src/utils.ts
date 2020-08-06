import {createSelector} from 'reselect';
import {CardView, MONTHS_LIST, SortType} from './types';
import Offer from './interfaces/offer';

export const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

export const extend = (object1, object2) => Object.assign({}, object1, object2);

export const getArticleClassName = (viewMode: CardView): {
  classNameForArticle: string,
  classNameForImage: string,
  classNameForInfo: string
} => {
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

export const getFormattedDate = (dateStr: string, isFull: boolean): string => {
  const date = new Date(dateStr);
  return isFull ? dateStr.match(/([^T]+)/)[0] : `${MONTHS_LIST[date.getMonth()]} ${date.getFullYear()}`;
};

export const getRatingInPercent = (ratingValue: number, isInteger: boolean): number => {
  return isInteger ? Math.round(ratingValue) * 100 / 5 : Math.round(ratingValue * 100 / 5);
};

export const sortOffers = (sortType: SortType, offers: {price: number; rating: number}[]) => {
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

export const getSortedOffers = createSelector(
    (state: {sortType: SortType}) => state.sortType,
    (state: {offers: Offer[]}) => state.offers,
    (activeSorting, offers) => sortOffers(activeSorting, offers)
);

export const noOperation = () => null;