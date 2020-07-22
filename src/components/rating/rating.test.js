import React from 'react';
import renderer from 'react-test-renderer';
import {Rating} from './rating.jsx';

describe(`RatingSnapshot`, () => {
  it(`should render Rating without selected value`, () => {

    const tree = renderer.create(
        <Rating
          onRatingChange={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Rating with value=4`, () => {

    const tree = renderer.create(
        <Rating
          onRatingChange={() => {}}
          selectedRating='4'
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
