import React from 'react';
import {mount} from 'enzyme';
import withSortedItems from './with-sorted-items.js';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

const MockComponent = () => <div />;
const MockComponentWrapped = withSortedItems(MockComponent);
const mockStore = configureStore([]);

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
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeSorting: `to-high`,
      },
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={mock.offers}
          />
        </Provider>
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
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeSorting: `to-low`,
      },
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={mock.offers}
          />
        </Provider>
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
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeSorting: `top-rated`,
      },
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={mock.offers}
            activeSorting='top-rated'
          />
        </Provider>
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
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeSorting: `popular`,
      },
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={mock.offers}
            activeSorting='popular'
          />
        </Provider>
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
