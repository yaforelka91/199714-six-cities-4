import {SortType} from './const.js';

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const sortOffers = (sortType, offers) => {
  switch (sortType) {
    case SortType.POPULAR:
      return offers.slice();
    case SortType.TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortType.TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
