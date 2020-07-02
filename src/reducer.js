import offersList from './mocks/offers.js';
import {extend} from './utils.js';
import {SortType} from './const.js';

const initialState = {
  city: offersList[0].city,
  offersList,
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
  getOffers: () => ({
    type: ActionType.GET_OFFERS,
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
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend({}, initialState);

    case ActionType.SORT_OFFERS:
      return extend(state, {
        activeSorting: action.payload,
      });

    case ActionType.SET_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

