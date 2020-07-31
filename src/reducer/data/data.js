import {extend} from '../../utils.js';
import adaptOffer from '../../adapters/offers.js';
import {ActionCreator as CatalogActionCreator} from '../catalog/catalog.js';

const initialState = {
  offersList: [],
  nearOffers: [],
  isOffersLoading: true,
  errorType: ``,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_NEAR_OFFERS: `LOAD_NEAR_OFFERS`,
  CHANGE_LOADING_STATUS: `CHANGE_LOADING_STATUS`,
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
  changeLoadingStatus: (isLoaded) => {
    return {
      type: ActionType.CHANGE_LOADING_STATUS,
      payload: isLoaded,
    };
  },
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
        dispatch(ActionCreator.changeLoadingStatus(false));
        dispatch(ActionCreator.loadOffers(adaptedOffers));
        dispatch(CatalogActionCreator.changeCity(adaptedOffers[0].city.name));
      })
      .catch((err) => {
        const {message} = err;
        dispatch(ActionCreator.changeLoadingStatus(false));
        dispatch(ActionCreator.catchError(message));

        throw err;
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
        throw err;
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
    case ActionType.CHANGE_LOADING_STATUS:
      return extend(state, {
        isOffersLoading: action.payload,
      });
    case ActionType.CATCH_ERROR:
      return extend(state, {
        errorType: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

