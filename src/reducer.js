import offersList from './mocks/offers.js';
import {extend} from './utils.js';

const getFilteredOffers = (cityId, offers) => {
  return offers
      .find((offer) => offer.city.id === cityId)
      .offers;
};

const initialState = {
  city: offersList[0].city,
  offersList,
  filteredOffers: getFilteredOffers(offersList[0].city.id, offersList),
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  changeCity: (cityId) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityId,
  }),
  getOffers: (cityId) => ({
    type: ActionType.GET_OFFERS,
    payload: cityId
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: state.offersList.find((offer) => offer.city.id === action.payload).city,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        filteredOffers: getFilteredOffers(action.payload, state.offersList),
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

