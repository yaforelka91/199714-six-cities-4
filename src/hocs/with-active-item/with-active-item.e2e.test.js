import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveItem from './with-active-item.js';

configure({
  adapter: new Adapter()
});

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
