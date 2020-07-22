import React from 'react';
import {shallow} from 'enzyme';
import {Button} from './button.jsx';

describe(`ButtonE2E`, () => {
  it(`Check arguments in callback after Button was pressed`, () => {
    const onButtonClick = jest.fn();

    const button = shallow(
        <Button
          onButtonClick={onButtonClick}
        >
          Button
        </Button>
    );

    button.simulate(`click`, 1);

    expect(onButtonClick).toHaveBeenCalledTimes(1);
    expect(onButtonClick.mock.calls[0][0]).toBe(1);
  });
});
