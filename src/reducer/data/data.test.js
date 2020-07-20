import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './data.js';
import {ActionType as CatalogActionType} from '../catalog/catalog.js';

const api = createAPI(() => {});

const offersList = [
  {
    city: {
      name: `Hamburg`,
      coords: [53.552645, 9.966287],
      zoom: 1,
    },
    id: 7,
    coords: [53.553542, 9.912283],
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
      errorType: ``,
    });
  });

  it(`Reducer should update offersList by load questions`, () => {
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
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct GET-request to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
        .onGet(`/hotels`)
        .reply(200, [{
          fake: true,
          city: {
            name: `city`,
          }
        }]);

    return offersLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_OFFERS,
            payload: [{
              fake: true,
              city: {
                name: `city`,
              }
            }],
          });
          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: CatalogActionType.CHANGE_CITY,
            payload: `city`,
          });
        });
  });
});
