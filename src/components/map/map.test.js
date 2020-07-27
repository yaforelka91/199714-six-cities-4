import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

const offers = [
  {
    id: 1,
    coords: [52.3909553943508, 4.85309666406198],
  }
];

describe(`MapSnapshot`, () => {
  it(`should render Map`, () => {

    const tree = renderer.create(
        <Map
          offers={offers}
        />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
