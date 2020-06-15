import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const offersList = [`Apartment 1`, `Apartment 2`, `Apartmentn 3`, `Apartmentn 4`];

const offersCount = 200;

describe(`MainE2E`, () => {
  it(`Should offer title be pressed`, () => {
    const onOfferTitleClick = jest.fn();

    const main = shallow(
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
