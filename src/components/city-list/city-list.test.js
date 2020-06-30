import React from 'react';
import renderer from 'react-test-renderer';
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

describe(`CityListSnapshot`, () => {
  it(`should render CityList`, () => {
    const tree = renderer.create(
        <CityList
          citiesList={cities}
          activeCity={cities[0]}
          onCityNameClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
