import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withSortedItems from './with-sorted-items.js';

configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const MockComponentWrapped = withSortedItems(MockComponent);

const mock = {
  offers: [
    {
      price: 1,
      rating: 2,
    },
    {
      price: 3,
      rating: 5,
    },
    {
      price: 2,
      rating: 4,
    }
  ],
};

describe(`withSortedItemsE2E`, ()=>{
  it(`Should return items that sorted by price: from low to high`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          offers={mock.offers}
          activeSorting='to-high'
        />
    );

    expect(wrapper.props().offers).toEqual([
      {
        price: 1,
        rating: 2,
      },
      {
        price: 2,
        rating: 4,
      },
      {
        price: 3,
        rating: 5,
      }
    ]);
  });

  it(`Should return items that sorted by price: from high to low`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          offers={mock.offers}
          activeSorting='to-low'
        />
    );

    expect(wrapper.props().offers).toEqual([
      {
        price: 3,
        rating: 5,
      },
      {
        price: 2,
        rating: 4,
      },
      {
        price: 1,
        rating: 2,
      }
    ]);
  });

  it(`Should return items that sorted by rating: top-rated first`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          offers={mock.offers}
          activeSorting='top-rated'
        />
    );

    expect(wrapper.props().offers).toEqual([
      {
        price: 3,
        rating: 5
      },
      {
        price: 2,
        rating: 4,
      },
      {
        price: 1,
        rating: 2,
      }
    ]);
  });

  it(`Should return items that sorted by popular`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          offers={mock.offers}
          activeSorting='popular'
        />
    );

    expect(wrapper.props().offers).toEqual([
      {
        price: 1,
        rating: 2,
      },
      {
        price: 3,
        rating: 5,
      },
      {
        price: 2,
        rating: 4,
      }
    ]);
  });
});
