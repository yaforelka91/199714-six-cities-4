import NameSpace from '../name-space.js';
import {createSelector} from 'reselect';

const MAX_COUNT_REVIEWS = 9;

const NAME_SPACE = NameSpace.REVIEWS;

export const getReviewsCount = (state) => {
  return state[NAME_SPACE].reviews.length;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getReducedReviews = createSelector(
    getReviews,
    (reviews) => {
      return reviews
      .sort(({visitTime: date1}, {visitTime: date2})=> {
        return (new Date(date2)).valueOf() - (new Date(date1)).valueOf();
      })
      .slice(0, MAX_COUNT_REVIEWS);
    }
);
