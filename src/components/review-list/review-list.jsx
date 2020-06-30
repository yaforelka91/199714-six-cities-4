import React, {Fragment} from 'react';
import ReviewCard from '../review-card/review-card.jsx';
import {reviewListTypes} from '../../types/types.js';

const MAX_COUNT_REVIEWS = 10;
const ReviewList = ({reviews}) => {
  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviews.length > 0 ?
        <ul className="reviews__list">
          {
            reviews
            .slice(0, MAX_COUNT_REVIEWS)
            .sort(({visitTime: date1}, {visitTime: date2})=> {
              return (new Date(date2)).valueOf() - (new Date(date1)).valueOf();
            })
            .map((review) => {
              return (
                <ReviewCard key={review.id} review={review} />
              );
            })
          }
        </ul>
        : null
      }
    </Fragment>
  );
};

ReviewList.propTypes = reviewListTypes;

export default ReviewList;
