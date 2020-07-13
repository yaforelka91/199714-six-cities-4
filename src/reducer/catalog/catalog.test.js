import {reducer, ActionCreator, ActionType} from './catalog.js';
import {SortType} from '../../const.js';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    });
  });

  it(`Reducer should change active sorting by a given value`, () => {
    expect(reducer({
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    }, {
      type: ActionType.CHANGE_SORT,
      payload: SortType.TO_LOW,
    })).toEqual({
      activeCard: -1,
      activeSorting: SortType.TO_LOW,
    });
  });

  it(`Reducer should change active offer by a given value`, () => {
    expect(reducer({
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    }, {
      type: ActionType.SET_ACTIVE_CARD,
      payload: 1,
    })).toEqual({
      activeCard: 1,
      activeSorting: SortType.POPULAR,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for sorting offers returns action with POPULAR payload`, ()=> {
    expect(ActionCreator.changeSort(SortType.POPULAR)).toEqual({
      type: ActionType.CHANGE_SORT,
      payload: SortType.POPULAR,
    });
  });

  it(`Action creator for setting active card returns action with offer payload`, ()=> {
    expect(ActionCreator.setActiveCard(1)).toEqual({
      type: ActionType.SET_ACTIVE_CARD,
      payload: 1,
    });
  });
});
