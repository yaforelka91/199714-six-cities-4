import React from 'react';
import renderer from 'react-test-renderer';
import Page from './page.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const children = <div className='children-component' />;

describe(`PageSnapshot`, () => {
  it(`should render Page`, () => {
    const tree = renderer.create(
        <Page
          authorizationStatus={AuthorizationStatus.AUTH}
          userData={{
            email: `test@test.com`,
            picture: `/pic.jpg`,
          }}
        >
          {children}
        </Page>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
