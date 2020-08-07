import React from 'react';
import renderer from 'react-test-renderer';
import {Textarea} from './textarea';
import {noOperation} from '../../utils';

describe(`TextareaSnapshot`, () => {
  it(`should render Textarea`, () => {

    const tree = renderer.create(
        <Textarea
          onTextareaChange={noOperation}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
