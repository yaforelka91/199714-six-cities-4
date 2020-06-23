import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const offersList = [
  {
    coords: [52.3909553943508, 4.85309666406198],
    title: `Offer`,
    description: [`text1`],
    picture: `pic1`,
    pictures: [`pic1`],
    price: 120,
    type: `Apartment`,
    isPremium: true,
    rating: 4.1,
    bedrooms: `3 Bedrooms`,
    guests: `Max 4 adults`,
    services: [`item 1`],
    host: {
      name: `Host`,
      picture: `photo`,
      isSuper: true,
    },
  }
];

const offersCount = 200;
describe(`AppSnapshot`, () => {
  it(`should render App`, () => {
    const tree = renderer.create(
        <App
          offersCount={offersCount}
          offersList={offersList}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
