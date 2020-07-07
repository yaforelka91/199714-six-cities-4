import React from 'react';
import renderer from 'react-test-renderer';
import CityListItem from './city-list-item.jsx';

const city = [
  {
    id: 1,
    name: `city 1`,
    coords: [0, 0],
  }
];

describe(`CityListItemSnapshot`, () => {
  it(`should render CityListItem`, () => {
    const tree = renderer.create(
        <CityListItem
          city={city}
          activeCity={1}
          onCityNameClick={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
