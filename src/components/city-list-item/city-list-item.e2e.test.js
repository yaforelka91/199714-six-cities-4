import React from 'react';
import {mount} from 'enzyme';
import CityListItem from './city-list-item.jsx';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const city = `city 1`;

describe(`CityListItemE2E`, () => {
  it(`Should city title be pressed`, () => {
    const onCityNameClick = jest.fn();

    const cityListItem = mount(
        <Router history={history}>
          <CityListItem
            city={city}
            onCityNameClick={onCityNameClick}
          />
        </Router>
    );

    const cityLink = cityListItem.find(`a.locations__item-link`);

    cityLink.simulate(`click`, {preventDefault() {}}, city);

    expect(onCityNameClick).toHaveBeenCalledTimes(1);
    expect(onCityNameClick.mock.calls[0][0]).toEqual(`city 1`);
  });
});
