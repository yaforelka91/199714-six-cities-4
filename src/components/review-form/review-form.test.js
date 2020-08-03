import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from './review-form.jsx';
import {Textarea} from '../textarea/textarea.jsx';
import {Rating} from '../rating/rating.jsx';

describe(`ReviewFormSnapshot`, () => {
  it(`should render ReviewForm`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={() => {}} />}
          renderTextarea={() => <Textarea onTextareaChange={() => {}}/>}
          onFormSubmit={() => {}}
          offerId={1}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render ReviewForm with disabled button when loading in progress`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={() => {}} />}
          renderTextarea={() => <Textarea onTextareaChange={() => {}} />}
          onFormSubmit={() => {}}
          isLoading={true}
          offerId={1}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render valid ReviewForm`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={() => {}} />}
          renderTextarea={() => <Textarea onTextareaChange={() => {}} />}
          onFormSubmit={() => {}}
          isLoading={false}
          isValid={true}
          offerId={1}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render ReviewForm with error message`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={() => {}} />}
          renderTextarea={() => <Textarea onTextareaChange={() => {}} />}
          onFormSubmit={() => {}}
          serverError='Some error text'
          isValid={false}
          offerId={1}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
