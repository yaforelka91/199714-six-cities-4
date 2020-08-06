import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Header} from './header';
import {AuthorizationStatus} from '../../reducer/user/user';
import {MemoryRouter, Router, Route} from 'react-router-dom';
import history from '../../history';
import {AppRoute} from '../../types';


describe(`HeaderSnapshot`, () => {
  it(`should render Header for guest`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <Header
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            userData={null}
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
              id: 1,
              name: `user`,
              email: `test@test.com`,
              picture: `/pic.jpg`,
              isSuper: true,
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
                id: 1,
                name: `user`,
                email: `test@test.com`,
                picture: `/pic.jpg`,
                isSuper: true,
              }}
            />
          </Route>
        </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
