import NameSpace from '../name-space.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.REVIEWS;

export const getReviewsCount = (state) => state[NAME_SPACE].reviews.length;

export const getReviews = (state) => state[NAME_SPACE].reviews;

export const getSortedReviews = createSelector(
    getReviews,
    (reviews) =>
      reviews.sort(({visitTime: date1}, {visitTime: date2}) =>
        (new Date(date2)).valueOf() - (new Date(date1)).valueOf()
      )
);
