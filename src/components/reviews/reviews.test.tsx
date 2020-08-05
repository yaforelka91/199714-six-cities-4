import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Reviews} from './reviews';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {noOperation} from '../../utils';
import Review from '../../interfaces/review';

const reviews: Review[] = [
  {
    id: 2,
    user: {
      name: `Maria`,
      picture: `pic`,
    },
    rating: 5,
    feedback: `Text`,
    visitTime: `2019-05-25`,
  },
  {
    id: 1,
    user: {
      name: `Max`,
      picture: `pic`,
    },
    rating: 4.2,
    feedback: `Text`,
    visitTime: `2018-04-24`,
  },
];

describe(`ReviewsSnapshot`, () => {
  it(`should render Review with review form`, () => {
    const tree = renderer.create(
        <Reviews
          reviews={reviews}
          reviewsCount={2}
          authorizationStatus={AuthorizationStatus.AUTH}
          offerId={1}
          onReviewFormSubmit={noOperation}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Review without review form`, () => {
    const tree = renderer.create(
        <Reviews
          reviews={reviews}
          reviewsCount={2}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          offerId={1}
          onReviewFormSubmit={noOperation}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
