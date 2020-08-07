import {reducer, ActionCreator, ActionType} from './catalog';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCity: ``,
    });
  });

  it(`Reducer should change active city by a given value`, () => {
    expect(reducer({
      activeCity: ``,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    })).toEqual({
      activeCity: `Amsterdam`,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing active city returns action with city payload`, () => {
    expect(ActionCreator.changeCity(`Amsterdam`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    });
  });
});
