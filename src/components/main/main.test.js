import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Main from './main.jsx';
import NameSpace from '../../reducer/name-space.js';

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
];

const city = {
  name: `city 1`,
  coords: [0, 0],
  zoom: 1,
};

describe(`MainSnapshot`, () => {
  it(`should render correctly`, () => {
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeSorting: `popular`,
      },
      [NameSpace.DATA]: {
        offersList,
        city
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Main
            offersList={offersList}
            onOfferTitleClick={() => {}}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render placeholder if offers array is empty`, () => {
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeSorting: `popular`,
      },
      [NameSpace.DATA]: {
        offersList: [],
        city
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Main
            offersList={[]}
            onOfferTitleClick={() => {}}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});
