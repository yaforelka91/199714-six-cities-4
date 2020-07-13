import React from 'react';
import {shallow} from 'enzyme';
import withActiveCity from './with-active-city.js';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import {getCity} from '../../reducer/data/selectors.js';

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveCity(MockComponent);
const mockStore = configureStore([]);

const mock = {
  offersList: [
    {
      city: {
        name: `city 1`,
      },
    },
    {
      city: {
        name: `city 2`,
      }
    },
    {
      city: {
        name: `city 3`,
      },
    }
  ],
  city: {
    name: `city 2`,
  }
};

describe(`withActiveCityE2E`, () => {
  it(`Should change active city by a given value`, () => {
    const {offersList, city} = mock;

    const store = mockStore({
      [NameSpace.DATA]: {
        offersList,
        city,
      }
    });

    const onCityNameClick = jest.fn();

    const wrapper = shallow(
        <Provider store={store}>
          <MockComponentWrapped
            activeCity={getCity(store.getState())}
            citiesList={mock.offers}
            onCityNameClick={onCityNameClick}
          />
        </Provider>
    );

    expect(wrapper.children().props().activeCity).toEqual({
      name: `city 2`,
    });
  });
});
