import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import CityList from './city-list.jsx';
import {getCities} from '../../reducer/data/selectors.js';
import NameSpace from '../../reducer/name-space.js';

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

describe(`CityListE2E`, () => {
  it(`Should city title be pressed`, () => {
    const onCityNameClick = jest.fn();

    const store = mockStore({
      [NameSpace.DATA]: {
        offersList: mock.offersList,
      }
    });

    const cityList = mount(
        <Provider store={store}>
          <CityList
            citiesList={getCities(store.getState())}
            activeCity={mock.city}
            onCityNameClick={onCityNameClick}
          />
        </Provider>
    );

    const cityLink = cityList.find(`.locations__item-link`).at(1);
    cityLink.simulate(`click`, {preventDefault() {}}, mock.offersList[1]);

    expect(onCityNameClick).toHaveBeenCalledTimes(1);
    expect(onCityNameClick.mock.calls[0][0]).toMatchObject({
      name: `city 2`,
      coords: [51.230569, 6.787428],
      zoom: 1,
    });
  });
});
