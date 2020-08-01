import React from 'react';
import renderer from 'react-test-renderer';
import Page from './page.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);
const children = <div className='children-component' />;
const userData = {
  email: `test@test.com`,
  picture: `/pic.jpg`
};

describe(`PageSnapshot`, () => {
  it(`should render Page`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Page
              userData={{
                email: `test@test.com`,
                picture: `/pic.jpg`,
              }}
            >
              {children}
            </Page>
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Page with footer`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Page
              userData={{
                email: `test@test.com`,
                picture: `/pic.jpg`,
              }}
              hasFooter={true}
            >
              {children}
            </Page>
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Page with Loader`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Page
              userData={{
                email: `test@test.com`,
                picture: `/pic.jpg`,
              }}
              isLoading={true}
            >
              {children}
            </Page>
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Page with ErrorScreen`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData,
      }
    });

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Page
              userData={{
                email: `test@test.com`,
                picture: `/pic.jpg`,
              }}
              errorMessage='Some error'
            >
              {children}
            </Page>
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
