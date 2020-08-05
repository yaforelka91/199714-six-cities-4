import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewForm from './review-form';
import {Textarea} from '../textarea/textarea';
import {Rating} from '../rating/rating';
import {noOperation} from '../../utils';

describe(`ReviewFormSnapshot`, () => {
  it(`should render ReviewForm`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={noOperation} />}
          renderTextarea={() => <Textarea onTextareaChange={noOperation}/>}
          onFormSubmit={noOperation}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render ReviewForm with disabled button when loading in progress`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={noOperation} />}
          renderTextarea={() => <Textarea onTextareaChange={noOperation} />}
          onFormSubmit={noOperation}
          isLoading={true}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render valid ReviewForm`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={noOperation} />}
          renderTextarea={() => <Textarea onTextareaChange={noOperation} />}
          onFormSubmit={noOperation}
          isLoading={false}
          isValid={true}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render ReviewForm with error message`, () => {
    const tree = renderer.create(
        <ReviewForm
          renderRating={() => <Rating onRatingChange={noOperation} />}
          renderTextarea={() => <Textarea onTextareaChange={noOperation} />}
          onFormSubmit={noOperation}
          serverError='Some error text'
          isValid={false}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
