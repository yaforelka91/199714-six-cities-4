import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import CityList from './city-list.jsx';
import NameSpace from '../../reducer/name-space.js';
import {getCities} from '../../reducer/data/selectors.js';

const mockStore = configureStore([]);

const mock = {
  offersList: [
    {
      city: {
        name: `city 1`,
        coords: [53.552645, 9.966287],
        zoom: 1,
      },
    },
    {
      city: {
        name: `city 2`,
        coords: [51.230569, 6.787428],
        zoom: 1,
      },
    },
    {
      city: {
        name: `city 1`,
        coords: [53.552645, 9.966287],
        zoom: 1,
      },
    },
  ],
  city: {
    name: `city 1`,
    coords: [53.552645, 9.966287],
    zoom: 1,
  },
};

describe(`CityListSnapshot`, () => {
  it(`should render CityList`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offersList: mock.offersList,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <CityList
            citiesList={getCities(store.getState())}
            activeCity={mock.city}
            onCityNameClick={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
