import {extend} from '../../utils.js';

const initialState = {
  activeCard: -1,
};

const ActionType = {
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
};

const ActionCreator = {
  setActiveCard: (offerId) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: offerId,
  })
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

