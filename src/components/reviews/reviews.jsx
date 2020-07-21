import React from 'react';
import ReviewCard from '../review-card/review-card.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import {reviewsTypes} from '../../types/types.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/reviews/reviews.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import withReview from '../../hocs/with-review/with-review.js';

const MAX_COUNT_REVIEWS = 10;
const ReviewFormWrapped = withReview(ReviewForm);
const Reviews = ({authorizationStatus, reviews, offerId, className, onReviewFormSubmit}) => {
  return (
    <section className={`review${className ? ` ${className}` : ``}`}>
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
});

const mapDispatchToProps = (dispatch) => ({
  onReviewFormSubmit(commentData, hotelId) {
    return dispatch(Operation.sendComment(commentData, hotelId));
  }
});

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);