import React from 'react';
import renderer from 'react-test-renderer';
import OfferPage from './offer-page.jsx';

const offer = {
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
};

describe(`OfferPageSnapshot`, () => {
  it(`should render OfferPage`, () => {
    const tree = renderer.create(
        <OfferPage
          offer={offer}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
