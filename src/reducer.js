import offersList from './mocks/offers.js';
import {extend} from './utils.js';
import {SortType} from './const.js';

const getFilteredOffers = (cityId, sortType, offers) => {
  const filteredList = offers
      .find((offer) => offer.city.id === cityId)
      .offers;
  return getSortedOffers(sortType, filteredList);
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
  activeCard: {},
  activeSorting: SortType.POPULAR,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  SORT_OFFERS: `SORT_OFFERS`,
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
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
  }),
  setActiveCard: (offer) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: offer,
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
        filteredOffers: getFilteredOffers(action.payload, state.activeSorting, state.offersList),
      });

    case ActionType.SORT_OFFERS:
      return extend(state, {
        activeSorting: action.payload,
        filteredOffers: getSortedOffers(action.payload, state.filteredOffers),
      });

    case ActionType.SET_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

