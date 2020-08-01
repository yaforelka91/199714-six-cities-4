import React from 'react';
import renderer from 'react-test-renderer';
import ErrorScreen from './error-screen.jsx';

describe(`ErrorScreenSnapshot`, () => {
  it(`should render ErrorScreen`, () => {
    const tree = renderer.create(
        <ErrorScreen message='Some error message' />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
