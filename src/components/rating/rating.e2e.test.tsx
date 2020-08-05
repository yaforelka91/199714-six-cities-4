import * as React from 'react';
import {shallow} from 'enzyme';
import {Rating} from './rating';

describe(`RatingE2E`, () => {
  it(`Check value in callback in onChange event`, () => {
    const onRatingChange = jest.fn();

    const rating = shallow(
        <Rating
          onRatingChange={onRatingChange}
        />
    );

    const mockEvent = {target: {value: `4`}};

    const markGood = rating.find(`input`).at(1);

    markGood.simulate(`change`, mockEvent);
    expect(onRatingChange).toHaveBeenCalledTimes(1);
    expect(onRatingChange).toHaveBeenCalledWith(mockEvent);
  });
});
