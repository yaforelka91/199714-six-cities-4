import React from 'react';
import ReviewCard from '../review-card/review-card';
import ReviewForm from '../review-form/review-form';
import {AuthorizationStatus} from '../../reducer/user/user';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/reviews/reviews';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import withReview from '../../hocs/with-review/with-review';
import {getReviewsCount, getSortedReviews} from '../../reducer/reviews/selectors';
import Review from '../../interfaces/review';

const MAX_COUNT_REVIEWS = 10;
const ReviewFormWrapped = withReview(ReviewForm);

type Props = {
  reviews: Review[];
  reviewsCount: number;
  authorizationStatus: string;
  offerId: number;
  className?: string;
  onReviewFormSubmit: (commentData: {rating: number; comment: string}, hotelId: number) => Promise<void>;
}

const Reviews: React.FC<Props> = (props: Props) => {
  const {
    authorizationStatus,
    reviewsCount,
    reviews,
    offerId,
    className = ``,
    onReviewFormSubmit
  } = props;

  return (
    <section className={`review${className ? ` ${className}` : ``}`}>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      {reviewsCount > 0 &&
        <ul className="reviews__list">
          {
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          }
        </ul>
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  reviewsCount: getReviewsCount(state),
  reviews: getSortedReviews(state).slice(0, MAX_COUNT_REVIEWS),
});

const mapDispatchToProps = (dispatch) => ({
  onReviewFormSubmit(commentData, hotelId) {
    return dispatch(Operation.sendComment(commentData, hotelId));
  }
});

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
