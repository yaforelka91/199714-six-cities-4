import React from 'react';
import {shallow} from 'enzyme';
import ReviewForm from './review-form.jsx';

describe(`ReviewForm E2E`, () => {
  it(`ReviewForm should be sended`, () => {
    const onFormSubmit = jest.fn();

    const form = shallow(
        <ReviewForm
          renderRating={() => {}}
          renderTextarea={() => {}}
          offerId={1}
          onFormSubmit={onFormSubmit}
        />
    );

    form.simulate(`submit`);

    expect(onFormSubmit.mock.calls.length).toBe(1);
  });
});
