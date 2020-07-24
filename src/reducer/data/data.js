import {extend} from '../../utils.js';
import adaptOffer from '../../adapters/offers.js';
import {ActionCreator as CatalogActionCreator} from '../catalog/catalog.js';

const initialState = {
  offersList: [],
  nearOffers: [],
  isLoading: false,
  errorType: ``,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEAR_OFFERS: `LOAD_NEAR_OFFERS`,
  SET_LOADING_STATUS: `SET_LOADING_STATUS`,
  CATCH_ERROR: `CATCH_ERROR`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },
  setLoadingStatus: (isLoading) => {
    return {
      type: ActionType.SET_LOADING_STATUS,
      payload: isLoading,
    };
  },
  loadNearOffers: (offers) => {
    return {
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: offers,
    };
  },
  catchError: (errorMessage) => ({
    type: ActionType.CATCH_ERROR,
    payload: errorMessage,
  })
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    ActionCreator.setLoadingStatus(true);
    return api.get(`/hotels`)
      .then((response) => {
        ActionCreator.setLoadingStatus(false);

        const adaptedOffers = response.data.map((offer) => {
          return adaptOffer(offer);
        });

        dispatch(ActionCreator.loadOffers(adaptedOffers));
        dispatch(CatalogActionCreator.changeCity(adaptedOffers[0].city.name));
      })
      .catch((err) => {
        ActionCreator.setLoadingStatus(false);
        const {message} = err;
        dispatch(ActionCreator.catchError(message));
      });
  },
  loadNearOffers: (offerId) => (dispatch, getState, api) => {
    ActionCreator.setLoadingStatus(true);

    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        ActionCreator.setLoadingStatus(false);

        const adaptedOffers = response.data.map((offer) => {
          return adaptOffer(offer);
        });

        dispatch(ActionCreator.loadNearOffers(adaptedOffers));
      })
      .catch((err) => {
        ActionCreator.setLoadingStatus(false);
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
    case ActionType.SET_LOADING_STATUS:
      return extend(state, {
        isLoading: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        errorType: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

