import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ReviewCard from '../review-card/review-card.jsx';

const ReviewList = ({reviews}) => {
  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {reviews.length > 0 ?
        <ul className="reviews__list">
          {
            reviews.map((review) => {
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

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape().isRequired
  ).isRequired,
};

export default ReviewList;
