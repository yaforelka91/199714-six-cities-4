import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const offersList = [
  {
    coords: [52.3909553943508, 4.85309666406198],
    title: `Offer 1`,
    picture: `pic1`,
    price: 120,
    type: `Apartment`,
    isPremium: true,
    rating: 4.1,
  },
  {
    coords: [52.369553943508, 4.85309666406198],
    title: `Offer 2`,
    picture: `pic2`,
    price: 80,
    type: `Private room`,
    isPremium: false,
    rating: 4.2,
  },
];

describe(`MainE2E`, () => {
  it(`Should offer title be pressed`, () => {
    const onOfferTitleClick = jest.fn();

    const main = mount(
        <Main
          offersList={offersList}
          onOfferTitleClick={onOfferTitleClick}
        />
    );

    const offerLinks = main.find(`.place-card__name a`);
    offerLinks.forEach((node) => {
      node.simulate(`click`);
    });
    expect(onOfferTitleClick).toHaveBeenCalledTimes(offersList.length);
  });
});
