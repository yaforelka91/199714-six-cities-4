import React from 'react';
import {mount} from 'enzyme';
import {PropTypes} from 'prop-types';
import withReview from './with-review.js';
import {createAPI} from '../../api.js';
import MockAdapter from 'axios-mock-adapter';
import {Operation} from '../../reducer/reviews/reviews.js';
import {Error} from '../../api.js';


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

    const mockPromise = Operation.sendComment({}, 1);

    apiMock
        .onPost(`/comments/${offerId}`)
        .reply(200, [{}]);

    const wrapper = mount(
        <MockComponentWrapped
          offerId={offerId}
          onReviewFormSubmit={() => {
            return mockPromise(() => {}, () => {}, api);
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

    wrapper.children().props().onFormSubmit({preventDefault() {}});

    return wrapper.children().props().onReviewFormSubmit()
    .then(() => {
      expect(wrapper.state().rating).toBe(``);
      expect(wrapper.state().review).toBe(``);
      expect(wrapper.state().serverError).toBe(``);
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      expect(wrapper.state().isLoading).toBe(false);
    });
  });

  it(`Should catch validation error from server`, () => {
    const offerId = 1;

    const apiMock = new MockAdapter(api);

    const textareaEvent = {
      target: {
        value: VALID_COMMENT,
        name: `review`,
      },
    };
    const ratingEvent = {
      target: {
        value: `4`,
        name: `rating`,
      },
    };

    const mockPromise = Operation.sendComment({}, 1);

    apiMock
        .onPost(`/comments/${offerId}`)
        .reply(400, {error: `error: ["email" must be a valid email]`});

    const wrapper = mount(
        <MockComponentWrapped
          offerId={offerId}
          onReviewFormSubmit={() => {
            return mockPromise(() => {}, () => {}, api);
          }}
        />
    );

    const rating = wrapper.find(`input`).at(1);
    rating.simulate(`change`, ratingEvent);

    const textarea = wrapper.find(`textarea`);
    textarea.simulate(`change`, textareaEvent);

    expect(wrapper.children().props().isValid).toEqual(true);

    wrapper.children().props().onFormSubmit({preventDefault() {}});

    return wrapper.children().props().onReviewFormSubmit()
    .then(() => {

    })
    .catch((err) => {
      expect(wrapper.state().rating).toBe(`4`);
      expect(wrapper.state().review).toBe(VALID_COMMENT);
      if (err.response.status === Error.BAD_REQUEST) {
        expect(wrapper.state().serverError).toBe(`"email" must be a valid email`);
      }
    })
    .finally(() => {
      expect(wrapper.state().isLoading).toBe(false);
    });
  });

  it(`Should catch unauthorized error from server`, () => {
    const offerId = 1;

    const apiMock = new MockAdapter(api);

    const textareaEvent = {
      target: {
        value: VALID_COMMENT,
        name: `review`,
      },
    };
    const ratingEvent = {
      target: {
        value: `4`,
        name: `rating`,
      },
    };

    const mockPromise = Operation.sendComment({}, 1);

    apiMock
        .onPost(`/comments/${offerId}`)
        .reply(401, {error: `You are not logged in`});

    const wrapper = mount(
        <MockComponentWrapped
          offerId={offerId}
          onReviewFormSubmit={() => {
            return mockPromise(() => {}, () => {}, api);
          }}
        />
    );

    const rating = wrapper.find(`input`).at(1);
    rating.simulate(`change`, ratingEvent);

    const textarea = wrapper.find(`textarea`);
    textarea.simulate(`change`, textareaEvent);

    expect(wrapper.children().props().isValid).toEqual(true);

    wrapper.children().props().onFormSubmit({preventDefault() {}});

    return wrapper.children().props().onReviewFormSubmit()
    .then(() => {

    })
    .catch((err) => {
      expect(wrapper.state().rating).toBe(`4`);
      expect(wrapper.state().review).toBe(VALID_COMMENT);
      if (err.response.status === Error.UNAUTHORIZED) {
        expect(wrapper.state().serverError).toBe(`You are not logged in`);
      }
    })
    .finally(() => {
      expect(wrapper.state().isLoading).toBe(false);
    });
  });
});
