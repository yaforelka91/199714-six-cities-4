import {SortType} from './const.js';

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
