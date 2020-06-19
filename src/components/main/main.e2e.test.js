import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const offersList = [
  {
    title: `Offer 1`,
    picture: `pic1`,
    price: 120,
    type: `Apartment`,
    isPremium: true,
    rating: 4.1,
  },
  {
    title: `Offer 2`,
    picture: `pic2`,
    price: 80,
    type: `Private room`,
    isPremium: false,
    rating: 4.2,
  },
  {
    title: `Offer 3`,
    picture: `pic3`,
    price: 132,
    type: `Hotel`,
    isPremium: false,
    rating: 4.3,
  },
  {
    title: `Offer 4`,
    picture: `pic4`,
    price: 180,
    type: `House`,
    isPremium: true,
    rating: 4.9,
  },
];

const offersCount = 200;

describe(`MainE2E`, () => {
  it(`Should offer title be pressed`, () => {
    const onOfferTitleClick = jest.fn((...args) => [...args]);

    const main = mount(
        <Main
          offersCount={offersCount}
          offersList={offersList}
          onOfferTitleClick={onOfferTitleClick}
        />
    );

    const offerLinks = main.find(`.place-card__name a`);
    offerLinks.forEach((node, index) => {
      node.simulate(`click`);
      expect(onOfferTitleClick).toHaveBeenCalledTimes(index + 1);
    });
  });
});
