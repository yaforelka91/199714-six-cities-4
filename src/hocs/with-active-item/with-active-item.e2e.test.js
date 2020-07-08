import React from 'react';
import {shallow} from 'enzyme';
import withActiveItem from './with-active-item.js';

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

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

describe(`withActiveItemE2E`, ()=>{
  it(`Should change active item`, () => {
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
