import React from 'react';
import renderer from 'react-test-renderer';
import {PropTypes} from 'prop-types';
import withReview from './with-review.js';

const MockComponent = ({renderRating, renderTextarea}) => {
  return (
    <div>
      {renderRating()}
      {renderTextarea()}
    </div>
  );
};

MockComponent.propTypes = {
  renderRating: PropTypes.func.isRequired,
  renderTextarea: PropTypes.func.isRequired,
};

const MockComponentWrapped = withReview(MockComponent);

describe(`withReviewSnapshot`, () => {
  it(`should render withReview`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          onReviewFormSubmit={() => {}}
          offerId={-1}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
