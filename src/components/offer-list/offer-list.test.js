import React from 'react';
import renderer from 'react-test-renderer';
import OfferList from './offer-list.jsx';

const offers = [
  {
    id: 1,
    title: `Offer 1`,
    picture: `pic1`,
    price: 120,
    type: `Apartment`,
    isPremium: true,
    rating: 4.1,
  },
  {
    id: 2,
    title: `Offer 2`,
    picture: `pic2`,
    price: 80,
    type: `Private room`,
    isPremium: false,
    rating: 4.2,
  },
  {
    id: 3,
    title: `Offer 3`,
    picture: `pic3`,
    price: 132,
    type: `Hotel`,
    isPremium: false,
    rating: 4.3,
  },
  {
    id: 4,
    title: `Offer 4`,
    picture: `pic4`,
    price: 180,
    type: `House`,
    isPremium: true,
    rating: 4.9,
  },
];

describe(`OfferListSnapshot`, () => {
  it(`should render OfferList`, () => {
    const tree = renderer.create(
        <OfferList
          offers={offers}
          isNear={false}
          onOfferTitleClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
