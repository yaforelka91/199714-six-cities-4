import offersList from './mocks/offers.js';
import {extend} from './utils.js';

const initialState = {
  city: offersList[0].city,
  offersList,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),
  getOffers: (city) => {
    return {
      type: ActionType.GET_OFFERS,
      payload: city,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return state;
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

