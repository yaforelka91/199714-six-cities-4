import React from 'react';
import renderer from 'react-test-renderer';
import {Login} from './login.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import history from '../../history.js';
import {Router} from 'react-router-dom';

const mockStore = configureStore([]);

describe(`LoginSnapshot`, () => {
  it(`should render Login page`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Login
              activeCity='Amsterdam'
              onFormSubmit={() => {}}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
