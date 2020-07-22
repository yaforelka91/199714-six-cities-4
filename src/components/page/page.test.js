import React from 'react';
import renderer from 'react-test-renderer';
import Page from './page.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const children = <div className='children-component' />;

describe(`PageSnapshot`, () => {
  it(`should render Page`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Page
            authorizationStatus={AuthorizationStatus.AUTH}
            userData={{
              email: `test@test.com`,
              picture: `/pic.jpg`,
            }}
          >
            {children}
          </Page>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
