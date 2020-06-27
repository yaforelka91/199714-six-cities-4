import React from 'react';
import renderer from 'react-test-renderer';
import ReviewList from './review-list.jsx';

const reviews = [
  {
    id: 1,
    user: {
      name: `Max`,
      picture: `pic`,
    },
    rating: 4.2,
    feedback: `Text`,
    visitTime: `2019-04-24`,
  },
  {
    id: 2,
    user: {
      name: `Maria`,
      picture: `pic`,
    },
    rating: 5,
    feedback: `Text`,
    visitTime: `2018-05-25`,
  },
];

describe(`ReviewListSnapshot`, () => {
  it(`should render ReviewList`, () => {
    const tree = renderer.create(
        <ReviewList
          reviews={reviews}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
