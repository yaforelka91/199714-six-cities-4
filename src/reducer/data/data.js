import {extend} from '../../utils.js';
import adaptOffers from '../../adapters/offers.js';

const initialState = {
  offersList: [],
  city: {
    name: ``,
    coords: [0, 0],
    zoom: 0,
  },
  error: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
  CATCH_ERROR: `CATH_ERROR`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  changeCity: (cityName) => ({
    type: ActionType.CHANGE_CITY,
    payload: cityName,
  }),
  catchError: (errorType) => ({
    type: ActionType.CATCH_ERROR,
    payload: errorType,
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const adaptedOffers = adaptOffers(response.data);

        dispatch(ActionCreator.loadOffers(adaptedOffers));
        dispatch(ActionCreator.changeCity(adaptedOffers[0].city));
      })
      .catch(() => {
        dispatch(ActionCreator.catchError(true));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offersList: action.payload,
      });
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        error: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

