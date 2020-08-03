import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Favorites} from './favorites.jsx';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';
import {AppRoute} from '../../const';

const mockStore = configureStore([]);

const offersList = [
  {
    'city 1': [
      {
        city: {
          name: `city 1`,
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
      }
    ]
  },
  {
    'city 2': [
      {
        city: {
          name: `city 2`,
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
    ]
  }
];

describe(`FavoritesE2E`, () => {
  it(`Should city title be pressed`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    });

    const onCityNameClick = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <Favorites
              offers={offersList}
              onFavoritesRequest={() => {}}
              onCityNameClick={onCityNameClick}
            />
          </Router>
        </Provider>
    );

    const cityLink = wrapper.find(`a.locations__item-link`).at(0);
    cityLink.simulate(`click`, `city 1`);

    expect(onCityNameClick).toHaveBeenCalledTimes(1);
    expect(onCityNameClick.mock.calls[0][0]).toBe(`city 1`);
    expect(history.location.pathname).toBe(AppRoute.ROOT);
  });
});
