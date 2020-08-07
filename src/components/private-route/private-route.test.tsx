import React from 'react';
import renderer from 'react-test-renderer';
import PrivateRoute from './private-route';
import {AuthorizationStatus} from '../../reducer/user/user';
import {MemoryRouter} from 'react-router';
import {AppRoute} from '../../types';

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
            render={() => <MockComponent />}
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
            render={() => <MockComponent />}
          />
        </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
