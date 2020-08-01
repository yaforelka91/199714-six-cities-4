import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './data.js';
import {ActionType as CatalogActionType} from '../catalog/catalog.js';
import NameSpace from '../name-space.js';

const api = createAPI(() => {});
const mockStore = configureStore([]);

const offersList = [
  {
    city: {
      name: `Hamburg`,
      coords: [53.552645, 9.966287],
      zoom: 1,
    },
    id: 7,
    coords: [53.553542, 9.912283],
    offerZoom: 12,
    title: `Apartment in Hamburg`,
    description: [
      `A quiet cozy and picturesque that hides behind a 
          river by the unique lightness of Amsterdam.
          The building is green and from 18th century.`,
      `An independent House, strategically located 
          between Rembrand Square and National Opera, 
          but where the bustle of the city comes to rest 
          in this alley flowery and colorful.`
    ],
    picture: `http://placeimg.com/260/200/arch`,
    pictures: [
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`
    ],
    price: 180,
    type: `Apartment`,
    isPremium: true,
    isFavorite: false,
    rating: 4.9,
    bedrooms: 4,
    guests: 6,
    services: [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
      `Fridge`,
    ],
    host: {
      id: 1,
      name: `Bob`,
      picture: `http://placekitten.com/74/74`,
      isSuper: true,
    },
  },
  {
    city: {
      name: `Dusseldorf`,
      coords: [51.230569, 6.787428],
      zoom: 1,
    },
    id: 8,
    coords: [51.202025, 6.800942],
    offerZoom: 12,
    title: `Apartment in Dusseldorf`,
    description: [
      `A quiet cozy and picturesque that hides behind a 
          river by the unique lightness of Amsterdam.
          The building is green and from 18th century.`,
      `An independent House, strategically located 
          between Rembrand Square and National Opera, 
          but where the bustle of the city comes to rest 
          in this alley flowery and colorful.`
    ],
    picture: `http://placeimg.com/260/200/arch`,
    pictures: [
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`
    ],
    price: 180,
    type: `Apartment`,
    isPremium: true,
    isFavorite: false,
    rating: 4.9,
    bedrooms: 4,
    guests: 6,
    services: [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
      `Fridge`,
    ],
    host: {
      id: 2,
      name: `Bob`,
      picture: `http://placekitten.com/74/74`,
      isSuper: true,
    },
  },
];

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      offersList: [],
      nearOffers: [],
      isOffersLoading: true,
      errorType: ``,
    });
  });

  it(`Reducer should update offersList by load offers`, () => {
    expect(reducer({
      offersList: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offersList,
    })).toEqual({
      offersList,
    });
  });

  it(`Reducer should set error`, () => {
    expect(reducer({
      errorType: ``,
    }, {
      type: ActionType.CATCH_ERROR,
      payload: `Some error`,
    })).toEqual({
      errorType: `Some error`,
    });
  });

  it(`Reducer should update nearby offers by load offers`, () => {
    expect(reducer({
      nearOffers: [],
    }, {
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: offersList,
    })).toEqual({
      nearOffers: offersList,
    });
  });

  it(`Reducer should change loading status`, () => {
    expect(reducer({
      isOffersLoading: true,
    }, {
      type: ActionType.CHANGE_LOADING_STATUS,
      payload: false,
    })).toEqual({
      isOffersLoading: false,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set error returns action with true payload`, () => {
    expect(ActionCreator.catchError(`error`)).toEqual({
      type: ActionType.CATCH_ERROR,
      payload: `error`,
    });
  });

  it(`Action creator for get offers returns action with offers payload`, () => {
    expect(ActionCreator.loadOffers(offersList)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offersList,
    });
  });

  it(`Action creator for get nearby offers returns action with offers payload`, () => {
    expect(ActionCreator.loadNearOffers(offersList)).toEqual({
      type: ActionType.LOAD_NEAR_OFFERS,
      payload: offersList,
    });
  });

  it(`Action creator for changing loading status returns action with false payload`, () => {
    expect(ActionCreator.changeLoadingStatus(false)).toEqual({
      type: ActionType.CHANGE_LOADING_STATUS,
      payload: false,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct GET-request to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeCity: ``,
      },
    });

    apiMock
        .onGet(`/hotels`)
        .reply(200, [{
          city: {
            name: `city`,
          }
        }]);

    return offersLoader(dispatch, store.getState, api)
        .then(() => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_OFFERS,
            payload: [{
              city: {
                name: `city`,
              }
            }],
          });
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: CatalogActionType.CHANGE_CITY,
            payload: `city`,
          });
          expect(dispatch).toHaveBeenNthCalledWith(3, {
            type: ActionType.CHANGE_LOADING_STATUS,
            payload: false,
          });
        });
  });

  it(`Should make a correct GET-request to /hotels/0/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearOffersLoader = Operation.loadNearOffers(0);

    apiMock
        .onGet(`/hotels/0/nearby`)
        .reply(200, [{
          id: 0,
          city: {
            name: `city`,
          }
        }]);

    return nearOffersLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_NEAR_OFFERS,
            payload: [{
              id: 0,
              city: {
                name: `city`,
              }
            }],
          });
        });
  });
});
