import {extend} from '../../utils.js';

const initialState = {
  activeCard: -1,
  activeCity: ``,
};

const ActionType = {
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreator = {
  setActiveCard: (offerId) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: offerId,
  }),
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });
    case ActionType.CHANGE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

