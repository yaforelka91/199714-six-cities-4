import offersList from './mocks/offers.js';
import {extend} from './utils.js';
import {SortType} from './const.js';

const getFilteredOffers = (cityId, offers) => {
  return offers
      .find((offer) => offer.city.id === cityId)
      .offers;
};

const getSortedOffers = (sortType, offers) => {
  switch (sortType) {
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

const initialState = {
  city: offersList[0].city,
  offersList,
  filteredOffers: offersList[0].offers,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  SORT_OFFERS: `SORT_OFFERS`,
};

const ActionCreator = {
  changeCity: (cityId) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityId,
  }),
  getOffers: (cityId) => ({
    type: ActionType.GET_OFFERS,
    payload: cityId
  }),
  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      if (action.payload === state.city) {
        return extend({}, initialState);
      }

      return extend(state, {
        city: state.offersList.find((offer) => offer.city.id === action.payload).city,
      });

    case ActionType.GET_OFFERS:
      if (action.payload === state.city) {
        return extend({}, initialState);
      }

      return extend(state, {
        filteredOffers: getFilteredOffers(action.payload, state.offersList),
      });

    case ActionType.SORT_OFFERS:
      return extend(state, {
        filteredOffers: action.payload === SortType.POPULAR
          ? getFilteredOffers(state.city.id, state.offersList)
          : getSortedOffers(action.payload, state.filteredOffers),
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

