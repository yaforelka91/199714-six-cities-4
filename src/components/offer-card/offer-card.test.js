import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

const offer = {
  title: `Offer Title`,
  picture: `pic1`,
  price: 120,
  type: `Apartment`,
  isPremium: true,
  rating: 4.1,
};

describe(`OfferCardSnapshot`, () => {
  it(`should render OfferCard`, () => {
    const tree = renderer.create(
        <OfferCard
          offer={offer}
          onOfferTitleClick={() => {}}
          onOfferCardEnter={() => {}}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
