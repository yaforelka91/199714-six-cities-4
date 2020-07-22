import {extend} from '../../utils.js';
import adaptOffer from '../../adapters/offers.js';

const initialState = {
  favorites: {},
};

const ActionType = {
  TOGGLE_FAVORITE: `TOGGLE_FAVORITE`,
};

const ActionCreator = {
  toggleFavorite: (hotel) => {
    return {
      type: ActionType.TOGGLE_FAVORITE,
      payload: hotel,
    };
  },
};

const Operation = {
  changeFavoriteStatus: (hotel) => (dispatch, getState, api) => {
    return api.post(`/favorite/${hotel.id}/${hotel.isFavorite}`, {
      hotel
    })
      .then((response) => {
        dispatch(ActionCreator.toggleFavorite(adaptOffer(response.data)));
      })
    .catch((err) => {
      throw err;
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_FAVORITE:
      return extend(state, {
        favorites: action.payload,
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
