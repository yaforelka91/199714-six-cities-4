import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './reviews.js';

const api = createAPI(() => {});
const serverReview = {
  comment: `Comment`,
  date: `2020-06-20T16:06:01.820Z`,
  id: 1,
  rating: 4,
  user: {
    // eslint-disable-next-line camelcase
    avatar_url: `pic.jpg`,
    id: 12,
    // eslint-disable-next-line camelcase
    is_pro: true,
    name: `Isaac`,
  },
};

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      reviews: [],
    });
  });

  it(`Reducer update reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.SEND_REVIEW,
      payload: [{fake: true}],
    })).toEqual({
      reviews: [{
        fake: true
      }]
    });
  });

  it(`Reducer load reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: [{fake: true}],
    })).toEqual({
      reviews: [{
        fake: true
      }]
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for send review returns action with reviews payload`, () => {
    expect(ActionCreator.sendReview({fake: true})).toEqual({
      type: ActionType.SEND_REVIEW,
      payload: {fake: true},
    });
  });

  it(`Action creator for loading reviews returns action with reviews payload`, () => {
    expect(ActionCreator.loadReviews([{fake: true}])).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: [{fake: true}],
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct POST-request to /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const mockReviewData = {
      feedback: `Comment 2`,
      rating: 4,
    };

    const sendComment = Operation.sendComment(mockReviewData, 1);

    apiMock
        .onPost(`/comments/1`)
        .reply(200, [{
          comment: `Comment 2`,
          date: `2020-06-20T16:06:01.820Z`,
          id: 2,
          rating: 4,
          user: {
            // eslint-disable-next-line camelcase
            avatar_url: `pic.jpg`,
            id: 12,
            // eslint-disable-next-line camelcase
            is_pro: true,
            name: `Isaac`,
          },
        }, serverReview]);

    return sendComment(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.SEND_REVIEW,
            payload: [{
              feedback: `Comment 2`,
              id: 2,
              rating: 4,
              user: {
                id: 12,
                isSuper: true,
                name: `Isaac`,
                picture: `pic.jpg`,
              },
              visitTime: `2020-06-20T16:06:01.820Z`
            }, {
              feedback: `Comment`,
              id: 1,
              rating: 4,
              user: {
                id: 12,
                isSuper: true,
                name: `Isaac`,
                picture: `pic.jpg`,
              },
              visitTime: `2020-06-20T16:06:01.820Z`
            }],
          });
        });
  });

  it(`Should make a correct GET-request to /comments/0`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(0);

    apiMock
        .onGet(`/comments/0`)
        .reply(200, [serverReview]);

    return reviewsLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_REVIEWS,
            payload: [{
              feedback: `Comment`,
              id: 1,
              rating: 4,
              user: {
                id: 12,
                isSuper: true,
                name: `Isaac`,
                picture: `pic.jpg`,
              },
              visitTime: `2020-06-20T16:06:01.820Z`
            }],
          });
        });
  });
});
