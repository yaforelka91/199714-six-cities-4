import React from 'react';
import renderer from 'react-test-renderer';
import ReviewCard from './review-card.jsx';

const review = {
  id: 1,
  user: {
    name: `Max`,
    picture: `pic`,
  },
  rating: 4,
  feedback: `Text`,
  visitTime: `2019-04-24`,
};

describe(`ReviewCardSnapshot`, () => {
  it(`should render ReviewCard`, () => {
    const tree = renderer.create(
        <ReviewCard
          review={review}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
