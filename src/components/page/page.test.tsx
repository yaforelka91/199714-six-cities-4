import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Page from './page';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Router} from 'react-router-dom';
import history from '../../history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space';
import {noOperation} from '../../utils';

const mockStore = configureStore([]);
const MockComponent = <div className='children-component' />;
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
              renderPage={() => MockComponent}
            />
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
              hasFooter={true}
              renderPage={noOperation}
            />
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
              isLoading={true}
              renderPage={noOperation}
            />
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
              errorMessage='Some error'
              renderPage={noOperation}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
