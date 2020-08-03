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
        .reply(200, [serverOffer]);

    return offersLoader(dispatch, store.getState, api)
        .then(() => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_OFFERS,
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
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: CatalogActionType.CHANGE_CITY,
            payload: `Dusseldorf`,
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
        .reply(200, [serverOffer]);

    return nearOffersLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_NEAR_OFFERS,
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
