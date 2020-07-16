import React from 'react';
import renderer from 'react-test-renderer';
import Login from './login.jsx';

describe(`LoginSnapshot`, () => {
  it(`should render Login page`, () => {
    const tree = renderer.create(
        <Login
          activeCity={{
            name: `Amsterdam`,
            coords: [0, 0],
            zoom: 0,
          }}
          onFormSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
