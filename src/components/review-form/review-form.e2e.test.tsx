import React from 'react';
import {shallow} from 'enzyme';
import ReviewForm from './review-form';
import {noOperation} from '../../utils';

describe(`ReviewForm E2E`, () => {
  it(`ReviewForm should be sended`, () => {
    const onFormSubmit = jest.fn();

    const form = shallow(
        <ReviewForm
          renderRating={noOperation}
          renderTextarea={noOperation}
          onFormSubmit={onFormSubmit}
        />
    );

    form.simulate(`submit`);

    expect(onFormSubmit.mock.calls.length).toBe(1);
  });
});
