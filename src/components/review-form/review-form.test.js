import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from './review-form.jsx';
import {Textarea} from '../textarea/textarea.jsx';
import {Rating} from '../rating/rating.jsx';

describe(`ReviewFormSnapshot`, () => {
  it(`should render ReviewForm`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => {
            return (
              <Rating
                onRatingChange={() => {}}
              />
            );
          }}
          renderTextarea={() => {
            return (
              <Textarea
                onTextareaChange={() => {}}
              />
            );
          }}
          onFormSubmit={() => {}}
          offerId={1}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
