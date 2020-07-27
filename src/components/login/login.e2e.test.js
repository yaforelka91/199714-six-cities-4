import React from 'react';
import {mount} from 'enzyme';
import {Login} from './login.jsx';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mockStore = configureStore([]);

describe(`LoginE2E`, () => {
  it(`Check object with data after form was submit`, () => {
    const store = mockStore({});
    const onFormSubmit = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <Login
              activeCity='city'
              onFormSubmit={onFormSubmit}
            />
          </Router>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    );

    const {_loginRef, _passwordRef} = wrapper.children().children().instance();

    _loginRef.current = {
      value: `test@test.com`,
    };

    _passwordRef.current = {
      value: `qwerty`,
    };

    const form = wrapper.find(`.login__form.form`).at(0);
    form.simulate(`submit`, {
      preventDefault() {}
    },
    {
      login: _loginRef.current.value,
      password: _passwordRef.current.value,
    });

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit.mock.calls[0][0]).toMatchObject({
      login: `test@test.com`,
      password: `qwerty`,
    });
  });
});
