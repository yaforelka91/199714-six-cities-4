import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {App} from './app.jsx';
import {CityList} from '../../const.js';

const mockStore = configureStore([]);

const offersList = [
  {
    city: {
      id: 5,
      name: CityList.HAMBURG,
      coords: [53.552645, 9.966287],
    },
    offers: [
      {
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
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
    ]
  },
  {
    city: {
      id: 6,
      name: CityList.DUSSELDORF,
      coords: [51.230569, 6.787428],
    },
    offers: [
      {
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
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
    ]
  }
];

describe(`AppSnapshot`, () => {
  it(`should render Main page`, () => {
    const store = mockStore({
      city: {
        id: 5,
        name: CityList.HAMBURG,
        coords: [53.552645, 9.966287],
      },
      activeSorting: `popular`,
      activeCard: -1,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            city={offersList[0].city}
            activeSorting='popular'
            activeCard={-1}
            offersList={offersList[0].offers}
            citiesList={
              offersList
              .map((offer) => offer.city)
              .slice(0, 6)
            }
            onCityNameClick={() => {}}
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

  it(`should render Offer page`, () => {
    const store = mockStore({
      activeCard: offersList[0].offers[0].id,
      activeSorting: `popular`,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            city={offersList[0].city}
            activeSorting='popular'
            activeCard={offersList[0].offers[0].id}
            offersList={offersList[0].offers}
            citiesList={
              offersList
              .map((offer) => offer.city)
              .slice(0, 6)
            }
            onCityNameClick={() => {}}
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
