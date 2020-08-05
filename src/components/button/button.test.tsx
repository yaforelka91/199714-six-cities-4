import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Button from './button';

describe(`ButtonSnapshot`, () => {
  it(`should render Button`, () => {

    const tree = renderer.create(
        <Button>Button</Button>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render disabled Button`, () => {

    const tree = renderer.create(
        <Button isDisabled={true}>Button</Button>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
