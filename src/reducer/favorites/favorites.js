import {extend} from '../../utils';
import adaptOffer from '../../adapters/offers.js';
import {ActionCreator as DataActionCreator} from '../data/data.js';
import {getOffers} from '../data/selectors.js';

const initialState = {
  favorites: {},
  favoriteList: [],
};

const ActionType = {
  TOGGLE_FAVORITE: `TOGGLE_FAVORITE`,
  GET_FAVORITE: `GET_FAVORITE`,
};

const ActionCreator = {
  toggleFavorite: (hotel) => ({
    type: ActionType.TOGGLE_FAVORITE,
    payload: hotel,
  }),
  getFavorite: (offers) => ({
    type: ActionType.GET_FAVORITE,
    payload: offers,
  }),
};

const Operation = {
  changeFavoriteStatus: (hotel) => (dispatch, getState, api) => {
    return api.post(`/favorite/${hotel.id}/${hotel.isFavorite}`, {
      hotel
    })
      .then((response) => {
        const adaptedOffer = adaptOffer(response.data);
        dispatch(ActionCreator.toggleFavorite(adaptedOffer));

        const index = getOffers(getState()).map((offer) => offer.id).indexOf(adaptedOffer.id);
        getOffers(getState())[index] = adaptedOffer;
        dispatch(DataActionCreator.loadOffers(getOffers(getState()).slice()));
      })
    .catch((err) => {
      throw err;
    });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const adaptedOffers = response.data.map((offer) => {
          return adaptOffer(offer);
        });

        dispatch(ActionCreator.getFavorite(adaptedOffers));
      })
    .catch((err) => {
      throw err;
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_FAVORITE:
      return extend(state, {
        favorites: action.payload,
      });

    case ActionType.GET_FAVORITE:
      return extend(state, {
        favoriteList: action.payload,
      });
  }
  return state;
};

export {
  reducer,
  ActionCreator,
  ActionType,
  Operation,
};
