import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './data.js';
import {CityList} from '../../const.js';

const api = createAPI(() => {});

const offersList = [
  {
    city: {
      name: CityList.HAMBURG,
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
      name: CityList.DUSSELDORF,
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
      city: {
        name: ``,
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 0,
        }
      }
    });
  });

  it(`Reducer should change current city by a given value`, () => {
    expect(reducer({
      city: {
        name: `city 1`,
        location: {
          latitude: 0,
          longitude: 0,
          zoom: 0,
        }
      },
    }, {
      type: ActionType.CHANGE_CITY,
      payload: {
        name: `city 2`,
        location: {
          latitude: 1,
          longitude: 1,
          zoom: 1,
        }
      },
    })).toEqual({
      city: {
        name: `city 2`,
        location: {
          latitude: 1,
          longitude: 1,
          zoom: 1,
        }
      },
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
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing city returns action with 1 payload`, () => {
    expect(ActionCreator.changeCity(1)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 1,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
        .onGet(`/hotels`)
        .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_OFFERS,
            payload: [{fake: true}],
          });
        });
  });
});
