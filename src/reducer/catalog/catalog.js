import {extend} from '../../utils.js';
import {SortType} from '../../const.js';

const initialState = {
  activeCard: -1,
  activeSorting: SortType.POPULAR,
};

const ActionType = {
  CHANGE_SORT: `CHANGE_SORT`,
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
};

const ActionCreator = {
  changeSort: (sortType) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortType,
  }),
  setActiveCard: (offerId) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: offerId,
  })
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SORT:
      return extend(state, {
        activeSorting: action.payload,
      });

    case ActionType.SET_ACTIVE_CARD:
      return extend(state, {
        activeCard: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

