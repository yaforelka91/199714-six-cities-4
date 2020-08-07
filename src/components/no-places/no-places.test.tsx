import React from 'react';
import renderer from 'react-test-renderer';
import NoPlaces from './no-places';

const city = `Amsterdam`;

describe(`NoPlacesSnapshot`, () => {
  it(`should render NoPlaces`, () => {
    const tree = renderer.create(
        <NoPlaces city={city} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
