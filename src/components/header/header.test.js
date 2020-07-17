import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';


describe(`HeaderSnapshot`, () => {
  it(`should render Header for guest`, () => {
    const tree = renderer.create(
        <Header
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          userData={{
            email: ``,
            picture: ``,
          }}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Header for user`, () => {
    const tree = renderer.create(
        <Header
          authorizationStatus={AuthorizationStatus.AUTH}
          userData={{
            email: `test@test.com`,
            picture: `/pic.jpg`,
          }}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
