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

const filterOffers = (cityId) => {
  return offersList.filter((offer) => offer.city.id === cityId);
};

const ActionCreator = {
  changeCity: (cityId) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityId,
  }),
  getOffers: (cityId) => {
    let filteredOffers = filterOffers(cityId);
    return {
      type: ActionType.GET_OFFERS,
      payload: filteredOffers,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (ActionType) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offersList: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

