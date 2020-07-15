import React from 'react';
import renderer from 'react-test-renderer';
import Page from './page.jsx';

const children = <div className='children-component' />;

describe(`PageSnapshot`, () => {
  it(`should render Page`, () => {
    const tree = renderer.create(
        <Page
        >
          {children}
        </Page>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
