import React from 'react';
import renderer from 'react-test-renderer';
import withReview from './with-review';
import {noOperation} from '../../utils';

type MockComponentProps = {
  renderRating: () => React.ReactNode;
  renderTextarea: () => React.ReactNode;
}

const MockComponent: React.FC<MockComponentProps> = (props: MockComponentProps) => {
  const {renderRating, renderTextarea} = props;
  return (
    <div>
      {renderRating()}
      {renderTextarea()}
    </div>
  );
};

const MockComponentWrapped = withReview(MockComponent);

describe(`withReviewSnapshot`, () => {
  it(`should render withReview`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          onReviewFormSubmit={noOperation}
          offerId={-1}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
