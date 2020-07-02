import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';

const mockStore = configureStore([]);

const offersList = [
  {
    city: {
      id: 4,
      name: `Amsterdam`,
      coords: [52.373057, 4.892557],
    },
    offers: [
      {
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
        rating: 4.1,
        bedrooms: `3 Bedrooms`,
        guests: `Max 4 adults`,
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
          name: `Angelina`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`0`, `1`],
      },
    ]
  },
];

const cities = [
  {
    id: 4,
    name: `Amsterdam`,
    coords: [52.373057, 4.892557],
  },
  {
    id: 1,
    name: `Paris`,
    coords: [48.856663, 2.351556],
  },
];

describe(`AppSnapshot`, () => {
  it(`should render App`, () => {
    const store = mockStore({
      city: offersList[0].city,
      offersList,
      filteredOffers: offersList[0].offers,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            city={offersList[0].city}
            offersList={offersList[0].offers}
            citiesList={cities}
            onCityNameClick={()=>{}}
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
