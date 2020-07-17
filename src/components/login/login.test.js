import React from 'react';
import renderer from 'react-test-renderer';
import {Login} from './login.jsx';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe(`LoginSnapshot`, () => {
  it(`should render Login page`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <Login
            activeCity='Amsterdam'
            onFormSubmit={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
