import React from 'react';
import renderer from 'react-test-renderer';
import CityListItem from './city-list-item.jsx';

const city = {
  name: `city 1`,
  coords: [0, 0],
  zoom: 1,
};

describe(`CityListItemSnapshot`, () => {
  it(`should render CityListItem`, () => {
    const tree = renderer.create(
        <CityListItem
          city={city}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
