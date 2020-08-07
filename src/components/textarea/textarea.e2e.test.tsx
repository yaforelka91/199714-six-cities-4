import React from 'react';
import {shallow} from 'enzyme';
import {Textarea} from './textarea';

describe(`TextareaE2E`, () => {
  it(`Check value in callback in onChange event`, () => {
    const onTextareaChange = jest.fn();

    const wrapper = shallow(
        <Textarea
          onTextareaChange={onTextareaChange}
        />
    );

    const mockEvent = {target: {value: `Textarea message`}};

    const textarea = wrapper.find(`textarea`);

    textarea.simulate(`change`, mockEvent);
    expect(onTextareaChange).toHaveBeenCalledTimes(1);
    expect(onTextareaChange).toHaveBeenCalledWith(mockEvent);
  });
});
