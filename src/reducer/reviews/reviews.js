import {extend} from '../../utils.js';
import adaptReview from '../../adapters/review.js';

const initialState = {
  reviews: [],
};

const ActionType = {
  SEND_REVIEW: `SEND_REVIEW`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  sendReview: (reviewData) => ({
    type: ActionType.SEND_REVIEW,
    payload: reviewData,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SEND_REVIEW:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
  }

  return state;
};

const Operation = {
  loadReviews: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        const adaptedReviews = response.data.map((review) => adaptReview(review));
        dispatch(ActionCreator.loadReviews(adaptedReviews));
      });
  },
  sendComment: (commentData, hotelId) => (dispatch, getState, api) => {
    return api.post(`/comments/${hotelId}`, {
      comment: commentData.comment,
      rating: commentData.rating,
    })
      .then((response) => {
        const adaptedReviews = response.data.map((review) => adaptReview(review));

        dispatch(ActionCreator.sendReview(adaptedReviews));
      })
    .catch((err) => {
      throw err;
    });
  },
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
