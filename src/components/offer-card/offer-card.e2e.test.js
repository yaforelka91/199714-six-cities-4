import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const offer = {
  title: `Offer 1`,
  picture: `pic1`,
  price: 120,
  type: `Apartment`,
  isPremium: true,
  rating: 4.1,
};

describe(`OfferCardE2E`, () => {
  it(`Check offer object in callback in mouseenetr event`, () => {
    const onOfferCardEnter = jest.fn();

    const card = shallow(
        <OfferCard
          offer={offer}
          onOfferCardEnter={onOfferCardEnter}
          onOfferTitleClick={()=>{}}
        />
    );

    card.simulate(`mouseenter`);

    expect(onOfferCardEnter).toHaveBeenCalledTimes(1);
    expect(onOfferCardEnter.mock.calls[0][0]).toMatchObject(offer);
  });
});
