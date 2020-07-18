import React from 'react';
import ReviewCard from '../review-card/review-card.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import {reviewsTypes} from '../../types/types.js';
import {AuthorizationStatus, Operation} from '../../reducer/user/user.js';
import {connect} from 'react-redux';
import {getAuthorizationStatus, getError} from '../../reducer/user/selectors.js';

const MAX_COUNT_REVIEWS = 10;
const Reviews = ({authorizationStatus, reviews, offerId, className, serverError, onReviewFormSubmit}) => {
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
      <ReviewForm onReviewFormSubmit={onReviewFormSubmit} offerId={offerId} serverError={serverError} />
      }
    </section>
  );
};

Reviews.defaultProps = {
  serverError: ``,
  className: ``,
};

Reviews.propTypes = reviewsTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  serverError: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onReviewFormSubmit(commentData, hotelId) {
    dispatch(Operation.sendComment(commentData, hotelId));
    // dispatch(Operation.sendComment(commentData, hotelId));
  }
});

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
