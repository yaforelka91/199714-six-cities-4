import React from 'react';
import {mount} from 'enzyme';
import CityList from './city-list.jsx';

const cities = [
  {
    id: 1,
    name: `city 1`,
    coords: [0, 0],
  },
  {
    id: 2,
    name: `city 2`,
    coords: [0, 0],
  }
];

describe(`CityListE2E`, () => {
  it(`Should city title be pressed`, () => {
    const onCityNameClick = jest.fn();

    const cityList = mount(
        <CityList
          citiesList={cities}
          activeCity={cities[0]}
          onCityNameClick={onCityNameClick}
        />
    );

    const cityLink = cityList.find(`.locations__item-link`).at(1);
    cityLink.simulate(`click`, {preventDefault() {}}, cities[1]);

    expect(onCityNameClick).toHaveBeenCalledTimes(1);
    expect(onCityNameClick.mock.calls[0][0]).toMatchObject({
      id: 2,
      name: `city 2`,
      coords: [0, 0],
    });
  });
});
