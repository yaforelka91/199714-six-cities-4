import React from 'react';
import renderer from 'react-test-renderer';
import {Reviews} from './reviews.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const reviews = [
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
];

describe(`ReviewsSnapshot`, () => {
  it(`should render Review with review form`, () => {
    const tree = renderer.create(
        <Reviews
          reviews={reviews}
          authorizationStatus={AuthorizationStatus.AUTH}
          offerId={1}
          onReviewFormSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Review without review form`, () => {
    const tree = renderer.create(
        <Reviews
          reviews={reviews}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          offerId={1}
          onReviewFormSubmit={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
