import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Main} from './main.jsx';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mockStore = configureStore([]);

const offersList = [
  {
    city: {
      name: `city 1`,
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
  {
    city: {
      name: `city 2`,
      coords: [0, 0],
      zoom: 1,
    },
    id: 1,
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
];

const city = `city 1`;

describe(`MainE2E`, () => {
  // it(`Should offer title be pressed`, () => {
  //   const store = mockStore({
  //     [NameSpace.USER]: {
  //       authorizationStatus: AuthorizationStatus.AUTH,
  //     }
  //   });

  //   const onOfferTitleClick = jest.fn();

  //   const main = mount(
  //       <Provider store={store}>
  //         <Main
  //           offersList={offersList}
  //           activeCity={city}
  //           citiesList={[city]}
  //           onCityNameClick={()=>{}}
  //           onOfferTitleClick={onOfferTitleClick}
  //         />
  //       </Provider>
  //   );

  //   const offerLinks = main.find(`.place-card__name a`);
  //   offerLinks.forEach((node) => {
  //     node.simulate(`click`);
  //   });

  //   expect(onOfferTitleClick).toHaveBeenCalledTimes(offersList.length);
  // });

  it(`Should city title be pressed`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    });

    const onCityNameClick = jest.fn();
    // const callback = jest.fn();

    const main = mount(
        <Provider store={store}>
          <Router history={history}>
            <Main
              offersList={offersList}
              activeCity={city}
              citiesList={[`city 1`, `city 2`]}
              onCityNameClick={onCityNameClick}
            />
          </Router>
        </Provider>
    );

    const cityLink = main.find(`.locations__item-link.tabs__item`).at(1);
    cityLink.simulate(`click`, {preventDefault() {}}, `city 2`);
    console.log(main.find(`a.locations__item-link.tabs__item`).length);
    // expect(onCityNameClick).toHaveBeenCalledTimes(1);
    // expect(onCityNameClick.mock.calls[0][0]).toBe(`city 1`);
    expect(onCityNameClick).toHaveBeenCalledTimes(1);
    expect(onCityNameClick.mock.calls[0][0]).toBe(`city 1`);
  });
});
