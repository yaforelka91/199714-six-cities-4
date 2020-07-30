import {extend, updateOffer} from '../../utils.js';
import adaptOffer from '../../adapters/offers.js';
import {ActionCreator as CatalogActionCreator} from '../catalog/catalog.js';

const initialState = {
  offersList: [],
  nearOffers: [],
  errorType: ``,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEAR_OFFERS: `LOAD_NEAR_OFFERS`,
  UPDATE_OFFER: `UPDATE_OFFER`,
  CATCH_ERROR: `CATCH_ERROR`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  loadNearOffers: (offers) => {
    return {
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: offers,
    };
  },
  updateOffer: (editedOffer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: editedOffer,
  }),
  catchError: (errorMessage) => ({
    type: ActionType.CATCH_ERROR,
    payload: errorMessage,
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const adaptedOffers = response.data.map((offer) => {
          return adaptOffer(offer);
        });

        dispatch(ActionCreator.loadOffers(adaptedOffers));
        dispatch(CatalogActionCreator.changeCity(adaptedOffers[0].city.name));
      })
      .catch((err) => {
        const {message} = err;
        dispatch(ActionCreator.catchError(message));
      });
  },
  loadNearOffers: (offerId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        const adaptedOffers = response.data.map((offer) => {
          return adaptOffer(offer);
        });

        dispatch(ActionCreator.loadNearOffers(adaptedOffers));
      })
      .catch((err) => {
        const {message} = err;
        dispatch(ActionCreator.catchError(message));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offersList: action.payload,
      });
    case ActionType.LOAD_NEAR_OFFERS:
      return extend(state, {
        nearOffers: action.payload,
      });
    case ActionType.UPDATE_OFFER:
      return extend(state, {
        offersList: updateOffer(state.offersList, action.payload),
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        errorType: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

