import React from 'react';
import {shallow} from 'enzyme';
import CityListItem from './city-list-item.jsx';

const city = `city 1`;

describe(`CityListItemE2E`, () => {
  it(`Should city title be pressed`, () => {
    const onCityNameClick = jest.fn();

    const cityListItem = shallow(
        <CityListItem
          city={city}
          onCityNameClick={onCityNameClick}
        />
    );

    const cityLink = cityListItem.find(`.locations__item-link`);

    cityLink.simulate(`click`, {preventDefault() {}}, city);

    expect(onCityNameClick).toHaveBeenCalledTimes(1);
    expect(onCityNameClick.mock.calls[0][0]).toEqual(`city 1`);
  });
});
