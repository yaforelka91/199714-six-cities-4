import React from 'react';
import renderer from 'react-test-renderer';
import {Rating} from './rating.jsx';

describe(`RatingSnapshot`, () => {
  it(`should render Rating`, () => {

    const tree = renderer.create(
        <Rating
          onRatingChange={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
