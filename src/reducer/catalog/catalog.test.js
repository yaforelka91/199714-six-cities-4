import {reducer, ActionCreator, ActionType} from './catalog.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCard: -1,
    });
  });

  it(`Reducer should change active offer by a given value`, () => {
    expect(reducer({
      activeCard: -1,
    }, {
      type: ActionType.SET_ACTIVE_CARD,
      payload: 1,
    })).toEqual({
      activeCard: 1,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting active card returns action with offer payload`, () => {
    expect(ActionCreator.setActiveCard(1)).toEqual({
      type: ActionType.SET_ACTIVE_CARD,
      payload: 1,
    });
  });
});
