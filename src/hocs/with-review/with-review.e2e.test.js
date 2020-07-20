import React from 'react';
import {mount} from 'enzyme';
import {PropTypes} from 'prop-types';
import withReview from './with-review.js';
import {createAPI} from '../../api.js';
import MockAdapter from 'axios-mock-adapter';

const VALID_COMMENT = `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`;
const MockComponent = ({renderRating, renderTextarea, onFormSubmit}) => {
  return (
    <form onSubmit={onFormSubmit}>
      {renderRating()}
      {renderTextarea()}
    </form>
  );
};

MockComponent.propTypes = {
  renderRating: PropTypes.func.isRequired,
  renderTextarea: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

const MockComponentWrapped = withReview(MockComponent);

const api = createAPI(() => {});

describe(`withReviewE2E`, () => {
  it(`Should send valid form`, () => {
    const offerId = 1;

    const apiMock = new MockAdapter(api);

    const textareaEvent = {
      target: {
        value: `Some review`,
        name: `review`,
      },
    };
    const ratingEvent = {
      target: {
        value: `4`,
        name: `rating`,
      },
    };

    const wrapper = mount(
        <MockComponentWrapped
          offerId={offerId}
          onReviewFormSubmit={() => {
            new Promise((resolve) => setTimeout(resolve));
          }}
        />
    );

    const rating = wrapper.find(`input`).at(1);
    rating.simulate(`change`, ratingEvent);

    expect(wrapper.children().props().isValid).toEqual(false);
    expect(wrapper.state().rating).toEqual(`4`);

    const textarea = wrapper.find(`textarea`);
    textarea.simulate(`change`, textareaEvent);

    expect(wrapper.state().review).toEqual(`Some review`);
    expect(wrapper.children().props().isValid).toEqual(false);

    textarea.simulate(`change`, {
      target: {
        value: VALID_COMMENT,
        name: `review`,
      }
    });

    expect(wrapper.children().props().isValid).toEqual(true);

    // apiMock
    // .onPost(`/comments/${offerId}`)
    // .reply(200, {
    //   comment: wrapper.state().comment,
    //   rating: wrapper.state().rating,
    // }, offerId)
    //   .then(() => {
    //     expect(wrapper.state().rating).toBe(``);
    //     expect(wrapper.state().review).toBe(``);
    //     expect(wrapper.state().serverError).toBe(``);
    //   })
    //   .finally(() => {
    //     expect(wrapper.state().isLoading).toBe(``);
    //   });

    setImmediate(() => {
      wrapper.children().props().onReviewFormSubmit();
      expect(wrapper.state().rating).toBe(``);
      expect(wrapper.state().review).toBe(``);
      expect(wrapper.state().serverError).toBe(``);
    });

    // wrapper.children().props().onReviewFormSubmit()
    // .then(() => {
    //   expect(wrapper.state().rating).toBe(``);
    //   expect(wrapper.state().review).toBe(``);
    //   expect(wrapper.state().serverError).toBe(``);
    // });
    // .finally(() => {
    //   expect(wrapper.state().isLoading).toBe(``);
    // });
  });
});
