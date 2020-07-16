import React from 'react';
import {shallow} from 'enzyme';
import Login from './login.jsx';

describe(`LoginE2E`, () => {
  it(`Check object with data after form was submit`, () => {
    const onFormSubmit = jest.fn();

    const wrapper = shallow(
        <Login
          activeCity={{
            name: `city`,
            coords: [0, 0],
            zoom: 0,
          }}
          onFormSubmit={onFormSubmit}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    );

    const {_loginRef, _passwordRef} = wrapper.instance();

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
