import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const offersList = [
  {
    title: `Offer 1`,
    description: [],
    picture: `pic1`,
    pictures: [],
    price: 120,
    type: `Apartment`,
    isPremium: true,
    rating: 4.1,
    bedrooms: ``,
    guests: ``,
    services: [],
    host: {
      name: ``,
      picture: ``,
      isSuper: false,
    },
  },
  {
    title: `Offer 2`,
    description: [],
    picture: `pic2`,
    pictures: [],
    price: 80,
    type: `Private room`,
    isPremium: false,
    rating: 4.2,
    bedrooms: ``,
    guests: ``,
    services: [],
    host: {
      name: ``,
      picture: ``,
      isSuper: false,
    },
  },
  {
    title: `Offer 3`,
    description: [],
    picture: `pic3`,
    pictures: [],
    price: 132,
    type: `Hotel`,
    isPremium: false,
    rating: 4.3,
    bedrooms: ``,
    guests: ``,
    services: [],
    host: {
      name: ``,
      picture: ``,
      isSuper: false,
    },
  },
  {
    title: `Offer 4`,
    description: [],
    picture: `pic4`,
    pictures: [],
    price: 180,
    type: `House`,
    isPremium: true,
    rating: 4.9,
    bedrooms: ``,
    guests: ``,
    services: [],
    host: {
      name: ``,
      picture: ``,
      isSuper: false,
    },
  },
];

const offersCount = 200;
describe(`AppSnapshot`, () => {
  it(`should render App`, () => {
    const tree = renderer.create(
        <App
          offersCount={offersCount}
          offersList={offersList}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
