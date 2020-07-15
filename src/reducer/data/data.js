import {extend} from '../../utils.js';
import adaptOffers from '../../adapters/offers.js';

const initialState = {
  offersList: [],
  error: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  CATCH_ERROR: `CATH_ERROR`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
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
    case ActionType.CATCH_ERROR:
      return extend(state, {
        error: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

