import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {getGroupedFavoriteOffers} from '../../reducer/favorites/selectors.js';
import {getOffers} from '../../reducer/data/selectors.js';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const.js';
const mockStore = configureStore([]);

const offersList = [
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
    isFavorite: true,
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
    id: 9,
    coords: [51.202045625, 6.800456942],
    offerZoom: 12,
    title: `Apartment in Dusseldorf 2`,
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
    price: 190,
    type: `Apartment`,
    isPremium: true,
    isFavorite: true,
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
      id: 3,
      name: `Mike`,
      picture: `http://placekitten.com/74/74`,
      isSuper: true,
    },
  },
];

const userData = {
  email: `test@test.com`,
  picture: `/pic1.jpg`
};

describe(`AppSnapshot`, () => {
  it(`should render Main page`, () => {
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeCity: offersList[0].city.name,
      },
      [NameSpace.DATA]: {
        offersList,
      },
      [NameSpace.FAVORITES]: {
        favoriteList: offersList,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={getAuthorizationStatus(store.getState())}
            favoriteOffers={getGroupedFavoriteOffers(store.getState())}
            offers={getOffers(store.getState())}
            history={createMemoryHistory({initialEntries: [AppRoute.ROOT]})}
          />
        </Provider>,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Login page`, () => {
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeCity: offersList[0].city.name,
      },
      [NameSpace.DATA]: {
        offersList,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            favoriteOffers={[]}
            offers={getOffers(store.getState())}
            history={createMemoryHistory({initialEntries: [AppRoute.LOGIN]})}
          />
        </Provider>,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render 404 page`, () => {
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeCity: offersList[0].city.name,
      },
      [NameSpace.DATA]: {
        offersList,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            favoriteOffers={[]}
            offers={getOffers(store.getState())}
            history={createMemoryHistory({initialEntries: [`/notvalid`]}) }
          />
        </Provider>,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render placeholder if offer array is empty`, () => {
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeCity: ``,
      },
      [NameSpace.DATA]: {
        offersList: [],
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            authorizationStatus={AuthorizationStatus.AUTH}
            favoriteOffers={[]}
            offers={[]}
            history={createMemoryHistory({initialEntries: [AppRoute.ROOT]}) }
          />
        </Provider>,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
