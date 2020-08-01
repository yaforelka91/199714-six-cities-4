import React from 'react';
import renderer from 'react-test-renderer';
import PrivateRoute from './private-route.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {MemoryRouter} from 'react-router';
import {AppRoute} from '../../const.js';

const MockComponent = () => <div />;

describe(`PrivateRouteSnapshot`, () => {
  it(`should render Loader`, () => {
    const tree = renderer.create(
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authorizationStatus={AuthorizationStatus.AUTH}
            isAuthorizationInProgress={true}
            render={() => {
              return <MockComponent />;
            }}
          />
        </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render PivateRoute with mock component`, () => {
    const tree = renderer.create(
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authorizationStatus={AuthorizationStatus.AUTH}
            render={() => {
              return <MockComponent />;
            }}
          />
        </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
