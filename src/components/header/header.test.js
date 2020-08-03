import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './header.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {MemoryRouter, Router, Route} from 'react-router-dom';
import history from '../../history.js';
import {AppRoute} from '../../const';


describe(`HeaderSnapshot`, () => {
  it(`should render Header for guest`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            userData={{
              email: ``,
              picture: ``,
            }}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Header for user`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={AuthorizationStatus.AUTH}
            userData={{
              email: `test@test.com`,
              picture: `/pic.jpg`,
            }}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Header with Link`, () => {
    const tree = renderer.create(
        <MemoryRouter initialEntries={[`${AppRoute.LOGIN}`]}>
          <Route
            path={AppRoute.LOGIN}
          >
            <Header
              authorizationStatus={AuthorizationStatus.AUTH}
              userData={{
                email: `test@test.com`,
                picture: `/pic.jpg`,
              }}
            />
          </Route>
        </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
