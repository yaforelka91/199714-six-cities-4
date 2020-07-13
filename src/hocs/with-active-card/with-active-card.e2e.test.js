import React from 'react';
import {shallow} from 'enzyme';
import withActiveCard from './with-active-card.js';

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveCard(MockComponent);

const mock = {
  offers: [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ],
};

describe(`withActiveCardE2E`, ()=>{
  it(`Should change active card`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          activeCard={-1}
          onOfferCardEnter={()=>{}}
        />
    );

    wrapper.props().onOfferCardEnter(mock.offers[0].id);
    expect(wrapper.props().activeCard).toEqual(1);
  });
});
