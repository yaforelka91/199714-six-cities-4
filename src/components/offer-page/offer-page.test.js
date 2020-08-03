import React from 'react';
import renderer from 'react-test-renderer';
import {OfferPage} from './offer-page.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mockStore = configureStore([]);

const mock = {
  offer: {
    city: {
      name: `city`,
      coords: [0, 0],
      zoom: 1,
    },
    id: 1,
    coords: [52.3909553943508, 4.85309666406198],
    offerZoom: 12,
    title: `Beautiful & luxurious apartment at great location`,
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
    price: 120,
    type: `Apartment`,
    isPremium: true,
    isFavorite: false,
    rating: 4.1,
    bedrooms: 3,
    guests: 4,
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
      name: `Angelina`,
      picture: `http://placekitten.com/74/74`,
      isSuper: true,
    },
  },
  offersList: [
    {
      city: {
        name: `city`,
        coords: [0, 0],
        zoom: 1,
      },
      id: 1,
      coords: [1, 2],
      offerZoom: 12,
      title: `Beautiful & luxurious apartment at great location`,
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
      price: 120,
      type: `Apartment`,
      isPremium: true,
      isFavorite: false,
      rating: 4.1,
      bedrooms: 3,
      guests: 4,
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
        name: `Angelina`,
        picture: `http://placekitten.com/74/74`,
        isSuper: true,
      },
    },
    {
      city: {
        name: `city`,
        coords: [0, 0],
        zoom: 1,
      },
      id: 2,
      coords: [3, 4],
      offerZoom: 12,
      title: `Beautiful & luxurious apartment at great location`,
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
      price: 120,
      type: `Apartment`,
      isPremium: true,
      isFavorite: false,
      rating: 4.1,
      bedrooms: 3,
      guests: 4,
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
        id: 5,
        name: `Angelina`,
        picture: `http://placekitten.com/74/74`,
        isSuper: true,
      },
    },
  ],
  reviews: [
    {
      id: 1,
      rating: 5,
      feedback: `Text`,
      user: {
        id: 1,
        name: `Max`,
        picture: `pic.jpg`,
      },
      visitTime: `2020-07-25`,
    }
  ]
};

describe(`OfferPageSnapshot`, () => {
  const {offer, offersList, reviews} = mock;

  it(`should render OfferPage`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      [NameSpace.REVIEWS]: {
        reviews,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <OfferPage
              offer={offer}
              offersList={offersList}
              onFavoriteButtonClick={() => {}}
              onReviewsRequest={() => reviews}
              onNearbyRequest={() => offersList}
            />
          </Router>
        </Provider>,
        {
          createNodeMock: () => document.createElement(`div`)
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
