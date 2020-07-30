import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Places from './places.jsx';
import {Provider} from 'react-redux';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mock = {
  offers: [
    {
      city: {
        name: `city`,
        coords: [0, 0],
        zoom: 1,
      },
      id: 0,
      coords: [52.3909553943508, 4.85309666406198],
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
      guests: 3,
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
  ],
  city: `city`
};

const mockStore = configureStore([]);

describe(`PlacesSnapshot`, () => {
  it(`should render Places`, () => {
    const {offers, city} = mock;
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Places
              offers={offers}
              city={city}
              onOfferCardEnter={() => {}}
              renderSorting={() => {}}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
