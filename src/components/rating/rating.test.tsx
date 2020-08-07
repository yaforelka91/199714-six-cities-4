import React from 'react';
import renderer from 'react-test-renderer';
import {Rating} from './rating';
import {noOperation} from '../../utils';

describe(`RatingSnapshot`, () => {
  it(`should render Rating without selected value`, () => {

    const tree = renderer.create(
        <Rating
          onRatingChange={noOperation}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`should render Rating with value=4`, () => {

    const tree = renderer.create(
        <Rating
          onRatingChange={noOperation}
          selectedRating='4'
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
