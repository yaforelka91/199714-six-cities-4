import React from 'react';
import renderer from 'react-test-renderer';
import {Button} from './button.jsx';

describe(`ButtonSnapshot`, () => {
  it(`should render Button`, () => {

    const tree = renderer.create(
        <Button>Button</Button>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
