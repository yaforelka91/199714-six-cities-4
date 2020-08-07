import React from 'react';
import {mount} from 'enzyme';
import {Login} from './login';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from '../../history';
import {noOperation} from '../../utils';

const mockStore = configureStore([]);
const mockEvent = {
  preventDefault: noOperation,
};

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
          createNodeMock: () => ({})
        }
    );

    const {loginRef, passwordRef} = wrapper.children().children().instance();

    loginRef.current = {
      value: `test@test.com`,
    };

    passwordRef.current = {
      value: `qwerty`,
    };

    const form = wrapper.find(`.login__form.form`).at(0);
    form.simulate(`submit`, mockEvent, {
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(onFormSubmit.mock.calls[0][0]).toMatchObject({
      login: `test@test.com`,
      password: `qwerty`,
    });
  });
});
