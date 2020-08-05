import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './favorites.js';
import {ActionType as DataActionType} from '../data/data.js';

import {extend} from '../../utils.js';
import NameSpace from '../name-space.js';

const api = createAPI(() => {});
const mockStore = configureStore([]);
const serverOffer = {
  bedrooms: 1,
  city: {
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
    name: `Dusseldorf`,
  },
  description: `Text`,
  goods: [`Fridge`, `Washer`],
  host: {
    // eslint-disable-next-line camelcase
    avatar_url: `img/avatar-angelina.jpg`,
    id: 25,
    // eslint-disable-next-line camelcase
    is_pro: true,
    name: `Angelina`,
  },
  id: 88,
  images: [`pic1.jpg`, `pic2.jpg`],
  // eslint-disable-next-line camelcase
  is_favorite: false,
  // eslint-disable-next-line camelcase
  is_premium: false,
  location: {
    latitude: 51.237402,
    longitude: 6.779314,
    zoom: 16,
  },
  // eslint-disable-next-line camelcase
  max_adults: 3,
  // eslint-disable-next-line camelcase
  preview_image: `pic1`,
  price: 205,
  rating: 3.9,
  title: `Nice, cozy, warm big bed apartment`,
  type: `room`,
};

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
      bedrooms: 1,
      city: {
        coords: [51.225402, 6.776314],
        name: `Dusseldorf`,
        zoom: 13,
      },
      coords: [51.237402, 6.779314],
      description: [`Text`],
      guests: 3,
      host: {id: 25, name: `Angelina`, picture: `img/avatar-angelina.jpg`, isSuper: true},
      id: 88,
      isFavorite: 1,
      isPremium: false,
      offerZoom: 16,
      picture: `pic1`,
      pictures: [`pic1.jpg`, `pic2.jpg`],
      price: 205,
      rating: 3.9,
      services: [`Fridge`, `Washer`],
      title: `Nice, cozy, warm big bed apartment`,
      type: `room`
    };

    const store = mockStore({
      [NameSpace.DATA]: {
        offersList: [{
          bedrooms: 1,
          city: {
            coords: [51.225402, 6.776314],
            name: `Dusseldorf`,
            zoom: 13,
          },
          coords: [51.237402, 6.779314],
          description: [`Text`],
          guests: 3,
          host: {id: 25, name: `Angelina`, picture: `img/avatar-angelina.jpg`, isSuper: true},
          id: 88,
          isFavorite: true,
          isPremium: false,
          offerZoom: 16,
          picture: `pic1`,
          pictures: [`pic1.jpg`, `pic2.jpg`],
          price: 205,
          rating: 3.9,
          services: [`Fridge`, `Washer`],
          title: `Nice, cozy, warm big bed apartment`,
          type: `room`
        }],
      },
    });

    const changeFavorites = Operation.changeFavoriteStatus(mockOfferData);

    apiMock
        .onPost(`/favorite/88/1`)
    // eslint-disable-next-line camelcase
        .reply(200, extend(serverOffer, {is_favorite: false}));

    return changeFavorites(dispatch, store.getState, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.TOGGLE_FAVORITE,
            payload: {
              bedrooms: 1,
              city: {
                coords: [51.225402, 6.776314],
                name: `Dusseldorf`,
                zoom: 13,
              },
              coords: [51.237402, 6.779314],
              description: [`Text`],
              guests: 3,
              host: {id: 25, name: `Angelina`, picture: `img/avatar-angelina.jpg`, isSuper: true},
              id: 88,
              isFavorite: false,
              isPremium: false,
              offerZoom: 16,
              picture: `pic1`,
              pictures: [`pic1.jpg`, `pic2.jpg`],
              price: 205,
              rating: 3.9,
              services: [`Fridge`, `Washer`],
              title: `Nice, cozy, warm big bed apartment`,
              type: `room`
            },
          });

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: DataActionType.LOAD_OFFERS,
            payload: [
              {
                bedrooms: 1,
                city: {
                  coords: [51.225402, 6.776314],
                  name: `Dusseldorf`,
                  zoom: 13,
                },
                coords: [51.237402, 6.779314],
                description: [`Text`],
                guests: 3,
                host: {id: 25, name: `Angelina`, picture: `img/avatar-angelina.jpg`, isSuper: true},
                id: 88,
                isFavorite: false,
                isPremium: false,
                offerZoom: 16,
                picture: `pic1`,
                pictures: [`pic1.jpg`, `pic2.jpg`],
                price: 205,
                rating: 3.9,
                services: [`Fridge`, `Washer`],
                title: `Nice, cozy, warm big bed apartment`,
                type: `room`
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
      .reply(200, [serverOffer]);

    return loadFavorites(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.GET_FAVORITE,
            payload: [{
              bedrooms: 1,
              city: {
                coords: [51.225402, 6.776314],
                name: `Dusseldorf`,
                zoom: 13,
              },
              coords: [51.237402, 6.779314],
              description: [`Text`],
              guests: 3,
              host: {id: 25, name: `Angelina`, picture: `img/avatar-angelina.jpg`, isSuper: true},
              id: 88,
              isFavorite: false,
              isPremium: false,
              offerZoom: 16,
              picture: `pic1`,
              pictures: [`pic1.jpg`, `pic2.jpg`],
              price: 205,
              rating: 3.9,
              services: [`Fridge`, `Washer`],
              title: `Nice, cozy, warm big bed apartment`,
              type: `room`
            }],
          });
        });
  });
});
