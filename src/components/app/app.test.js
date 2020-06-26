import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const settings = {
  offersList: [
    {
      id: 1,
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
    },
  ],
};

describe(`AppSnapshot`, () => {
  it(`should render App`, () => {
    const tree = renderer.create(
        <App
          settings={settings}
        />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
