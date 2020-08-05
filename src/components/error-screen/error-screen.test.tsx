import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ErrorScreen from './error-screen';
import {Router} from 'react-router-dom';
import history from '../../history';

describe(`ErrorScreenSnapshot`, () => {
  it(`should render ErrorScreen`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <ErrorScreen
            message='Some error message'
            isNotFound={false}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render ErrorScreen for 404`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <ErrorScreen
            message='Page not found'
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
