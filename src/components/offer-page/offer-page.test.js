import React from 'react';
import renderer from 'react-test-renderer';
import OfferPage from './offer-page.jsx';

const mock = {
  offer: {
    id: 1,
    title: `Offer`,
    description: [`text1`],
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
    reviews: [`1`],
  },
  offersList: [
    {
      id: 2,
      coords: [52.3909553943508, 4.85309666406198],
      title: `Offer 1`,
      picture: `pic1`,
      price: 120,
      type: `Apartment`,
      isPremium: true,
      rating: 4.1,
    },
    {
      id: 3,
      coords: [52.369553943508, 4.85309666406198],
      title: `Offer 2`,
      picture: `pic2`,
      price: 80,
      type: `Private room`,
      isPremium: false,
      rating: 4.2,
    }
  ],
};

describe(`OfferPageSnapshot`, () => {
  const {offer, offersList} = mock;
  it(`should render OfferPage`, () => {
    const tree = renderer.create(
        <OfferPage
          offer={offer}
          offersList={offersList}
          onOfferTitleClick={() => {}}
        />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
