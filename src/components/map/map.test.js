import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map.jsx';

const offers = [
  {
    coords: [52.3909553943508, 4.85309666406198],
  }
];

const activeCity = [52.3909553943508, 4.85309666406198];

describe(`MapSnapshot`, () => {
  it(`should render Map`, () => {
    const tree = renderer.create(
        <Map
          offers={offers}
          activeCity={activeCity}
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
