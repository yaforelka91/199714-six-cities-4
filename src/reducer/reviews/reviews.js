import {extend} from '../../utils.js';

const initialState = {
  reviews: [],
};

const ActionType = {
  SEND_REVIEW: `SEND_REVIEW`,
};

const ActionCreator = {
  sendReview: (reviewData) => {
    return {
      type: ActionType.SEND_REVIEW,
      payload: reviewData,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SEND_REVIEW:
      return extend(state, {
        reviews: action.payload,
      });
  }

  return state;
};

const Operation = {
  sendComment: (commentData, hotelId) => (dispatch, getState, api) => {
    return api.post(`/comments/${hotelId}`, {
      comment: commentData.comment,
      rating: commentData.rating,
    })
      .then((response) => {
        dispatch(ActionCreator.sendReview(response.data));
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
