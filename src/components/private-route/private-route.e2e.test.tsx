import * as React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router';
import PrivateRoute from './private-route';
import {AppRoute} from '../../types';
import {AuthorizationStatus} from '../../reducer/user/user';

const MockComponent = () => <div />;

describe(`PrivateRoute E2E`, () => {
  it(`Should render component if user has been authenticated`, () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authorizationStatus={AuthorizationStatus.AUTH}
            render={() => <MockComponent />}
          />
        </MemoryRouter>
    );

    expect(wrapper.exists(MockComponent)).toBe(true);
  });

  it(`should redirect to Login if user is not authenticated`, () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            render={() => <MockComponent />}
          />
        </MemoryRouter>
    );

    const history = wrapper.find(`Router`).prop(`history`);
    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });
});
