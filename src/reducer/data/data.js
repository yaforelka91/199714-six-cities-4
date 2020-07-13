import {extend} from '../../utils.js';

const initialState = {
  offersList: [],
  city: {
    name: ``,
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    }
  }
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CHANGE_CITY: `CHANGE_CITY`,
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
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
        dispatch(ActionCreator.changeCity(response.data[0].city));
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
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

