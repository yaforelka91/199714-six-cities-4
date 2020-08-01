import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './favorites.js';
import {ActionType as DataActionType} from '../data/data.js';

import {extend} from '../../utils.js';
import NameSpace from '../name-space.js';

const api = createAPI(() => {});
const mockStore = configureStore([]);

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      favorites: {},
      favoriteList: [],
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

  it(`Reducer should update favoritesList by a given value`, () => {
    expect(reducer({
      favoriteList: [],
    }, {
      type: ActionType.GET_FAVORITE,
      payload: [{isFavorite: true}],
    })).toEqual({
      favoriteList: [{isFavorite: true}]
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

  it(`Action creator for getting favorites returns action with favorite list payload`, () => {
    expect(ActionCreator.getFavorite([{isFavorite: true}])).toEqual({
      type: ActionType.GET_FAVORITE,
      payload: [{isFavorite: true}],
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct POST-request to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const mockOfferData = {
      id: 0,
      isFavorite: 1
    };

    const store = mockStore({
      [NameSpace.DATA]: {
        offersList: [{
          id: 0,
          isFavorite: true
        }],
      },
    });

    const changeFavorites = Operation.changeFavoriteStatus(mockOfferData);

    apiMock
        .onPost(`/favorite/0/1`)
        .reply(200, extend(mockOfferData, {
          id: 0,
          isFavorite: false,
        }));

    return changeFavorites(dispatch, store.getState, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.TOGGLE_FAVORITE,
            payload: {
              id: 0,
              isFavorite: false,
            },
          });

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: DataActionType.LOAD_OFFERS,
            payload: [
              {
                id: 0,
                isFavorite: false
              }
            ],
          });
        });
  });

  it(`Should make a correct GET-request to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const loadFavorites = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{
        id: 0,
        isFavorite: true,
      }]);

    return loadFavorites(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.GET_FAVORITE,
            payload: [{
              id: 0,
              isFavorite: true,
            }]
          });
        });
  });
});
