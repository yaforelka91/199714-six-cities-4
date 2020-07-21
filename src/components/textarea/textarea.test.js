import React from 'react';
import renderer from 'react-test-renderer';
import {Textarea} from './textarea.jsx';

describe(`TextareaSnapshot`, () => {
  it(`should render Textarea`, () => {

    const tree = renderer.create(
        <Textarea
          onTextareaChange={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
