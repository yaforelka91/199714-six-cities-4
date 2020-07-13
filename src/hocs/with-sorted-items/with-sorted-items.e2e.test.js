import React from 'react';
import {mount} from 'enzyme';
import withSortedItems from './with-sorted-items.js';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import {getSortedOffers} from '../../reducer/catalog/selectors.js';

const MockComponent = () => <div />;
const MockComponentWrapped = withSortedItems(MockComponent);
const mockStore = configureStore([]);

const mock = {
  offers: [
    {
      city: {
        name: `city`,
      },
      price: 1,
      rating: 2,
    },
    {
      city: {
        name: `city`,
      },
      price: 3,
      rating: 5,
    },
    {
      city: {
        name: `city`,
      },
      price: 2,
      rating: 4,
    }
  ],
  city: {
    name: `city`,
  }
};

describe(`withSortedItemsE2E`, () => {
  it(`Should return items that sorted by price: from low to high`, () => {
    const store = mockStore({
      [NameSpace.CATALOG]: {
        activeSorting: `to-high`,
      },
      [NameSpace.DATA]: {
        offersList: mock.offers,
        city: mock.city,
      }
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={getSortedOffers(store.getState())}
          />
        </Provider>
    );

    expect(wrapper.children().props().offers).toEqual([
      {
        city: {
          name: `city`,
        },
        price: 1,
        rating: 2,
      },
      {
        city: {
          name: `city`,
        },
        price: 2,
        rating: 4,
      },
      {
        city: {
          name: `city`,
        },
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
      [NameSpace.DATA]: {
        offersList: mock.offers,
        city: mock.city,
      }
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={getSortedOffers(store.getState())}
          />
        </Provider>
    );

    expect(wrapper.children().props().offers).toEqual([
      {
        city: {
          name: `city`,
        },
        price: 3,
        rating: 5,
      },
      {
        city: {
          name: `city`,
        },
        price: 2,
        rating: 4,
      },
      {
        city: {
          name: `city`,
        },
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
      [NameSpace.DATA]: {
        offersList: mock.offers,
        city: mock.city,
      }
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={getSortedOffers(store.getState())}
          />
        </Provider>
    );

    expect(wrapper.children().props().offers).toEqual([
      {
        city: {
          name: `city`,
        },
        price: 3,
        rating: 5
      },
      {
        city: {
          name: `city`,
        },
        price: 2,
        rating: 4,
      },
      {
        city: {
          name: `city`,
        },
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
      [NameSpace.DATA]: {
        offersList: mock.offers,
        city: mock.city,
      }
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            offers={getSortedOffers(store.getState())}
          />
        </Provider>
    );

    expect(wrapper.children().props().offers).toEqual([
      {
        city: {
          name: `city`,
        },
        price: 1,
        rating: 2,
      },
      {
        city: {
          name: `city`,
        },
        price: 3,
        rating: 5,
      },
      {
        city: {
          name: `city`,
        },
        price: 2,
        rating: 4,
      }
    ]);
  });
});
