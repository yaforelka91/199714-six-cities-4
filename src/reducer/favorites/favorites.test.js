import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './favorites.js';
import {extend} from '../../utils.js';

const api = createAPI(() => {});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      favorites: {},
    });
  });

  it(`Reducer update favorites`, () => {
    expect(reducer({
      favorites: {},
    }, {
      type: ActionType.TOGGLE_FAVORITE,
      payload: {isFavorite: true},
    })).toEqual({
      favorites: {isFavorite: true}
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for toggle favorites returns action with favorite payload`, () => {
    expect(ActionCreator.toggleFavorite({isFavorite: false})).toEqual({
      type: ActionType.TOGGLE_FAVORITE,
      payload: {isFavorite: false},
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct POST-request to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const mockReviewData = {
      id: 0,
      isFavorite: 1
    };

    const changeFavorites = Operation.changeFavoriteStatus(mockReviewData);

    apiMock
        .onPost(`/favorite/0/1`)
        .reply(200, extend(mockReviewData, {
          isFavorite: false,
        }));

    return changeFavorites(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.TOGGLE_FAVORITE,
            payload: {
              id: 0,
              isFavorite: false,
            },
          });
        });
  });
});
