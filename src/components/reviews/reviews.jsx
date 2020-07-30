import React from 'react';
import ReviewCard from '../review-card/review-card.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import {reviewsTypes} from '../../types/types.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/reviews/reviews.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import withReview from '../../hocs/with-review/with-review.js';
import {getReviewsCount, getReducedReviews} from '../../reducer/reviews/selectors.js';

const ReviewFormWrapped = withReview(ReviewForm);
const Reviews = ({authorizationStatus, reviewsCount, reviews, offerId, className, onReviewFormSubmit}) => {
  return (
    <section className={`review${className ? ` ${className}` : ``}`}>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      {reviewsCount > 0 ?
        <ul className="reviews__list">
          {
            reviews
            .map((review) => {
              return (
                <ReviewCard key={review.id} review={review} offerId={offerId} />
              );
            })
          }
        </ul>
        : null
      }
      {
        authorizationStatus === AuthorizationStatus.AUTH &&
      <ReviewFormWrapped
        onReviewFormSubmit={onReviewFormSubmit}
        offerId={offerId}
      />
      }
    </section>
  );
};

Reviews.defaultProps = {
  className: ``,
};

Reviews.propTypes = reviewsTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  reviewsCount: getReviewsCount(state),
  reviews: getReducedReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  onReviewFormSubmit(commentData, hotelId) {
    return dispatch(Operation.sendComment(commentData, hotelId));
  }
});

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
