import * as React from 'react';
import {mount} from 'enzyme';
import withReview from './with-review';
import {createAPI} from '../../api.js';
import MockAdapter from 'axios-mock-adapter';
import {Operation} from '../../reducer/reviews/reviews.js';
import {Error} from '../../api.js';
import {noOperation} from '../../utils';

const VALID_COMMENT = `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`;

type MockComponentProps = {
  renderRating: () => React.ReactNode;
  renderTextarea: () => React.ReactNode;
  onFormSubmit: (evt: React.SyntheticEvent<HTMLFormElement>) => void;
}

const MockComponent: React.FC<MockComponentProps> = (props: MockComponentProps) => {
  const {renderRating, renderTextarea, onFormSubmit} = props;
  return (
    <form onSubmit={onFormSubmit}>
      {renderRating()}
      {renderTextarea()}
    </form>
  );
};

const MockComponentWrapped = withReview(MockComponent);

const api = createAPI(noOperation);

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
        .reply(200, [{
          comment: `Comment`,
          date: `2020-06-20T16:06:01.820Z`,
          id: 1,
          rating: 4,
          user: {
            // eslint-disable-next-line camelcase
            avatar_rl: `pic.jpg`,
            id: 12,
            // eslint-disable-next-line camelcase
            is_pro: true,
            name: `Isaac`,
          },
        }]);

    const wrapper = mount(
        <MockComponentWrapped
          offerId={offerId}
          onReviewFormSubmit={() => mockPromise(noOperation, noOperation, api)}
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
          onReviewFormSubmit={() => mockPromise(noOperation, noOperation, api)}
        />
    );

    const rating = wrapper.find(`input`).at(1);
    rating.simulate(`change`, ratingEvent);

    const textarea = wrapper.find(`textarea`);
    textarea.simulate(`change`, textareaEvent);

    expect(wrapper.children().props().isValid).toEqual(true);

    wrapper.children().props().onFormSubmit({preventDefault() {}});

    return wrapper.children().props().onReviewFormSubmit()
    .then(noOperation)
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
          onReviewFormSubmit={() => mockPromise(noOperation, noOperation, api)}
        />
    );

    const rating = wrapper.find(`input`).at(1);
    rating.simulate(`change`, ratingEvent);

    const textarea = wrapper.find(`textarea`);
    textarea.simulate(`change`, textareaEvent);

    expect(wrapper.children().props().isValid).toEqual(true);

    wrapper.children().props().onFormSubmit({preventDefault() {}});

    return wrapper.children().props().onReviewFormSubmit()
    .then(noOperation)
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

  it(`Should clear form if offerId has been changed`, () => {
    const offerId = 1;

    const wrapper = mount(
        <MockComponentWrapped
          offerId={offerId}
          onReviewFormSubmit={noOperation}
        />
    );

    wrapper.setState({
      review: VALID_COMMENT,
      rating: `4`,
      serverError: `Some error`,
    });
    wrapper.setProps({offerId: 2});
    expect(wrapper.state().serverError).toBe(``);
    expect(wrapper.state().rating).toBe(``);
    expect(wrapper.state().review).toBe(``);
  });
});
