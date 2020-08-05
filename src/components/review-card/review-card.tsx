import * as React from 'react';
import {getRatingInPercent, getFormattedDate} from '../../utils';
import Review from '../../interfaces/review';

type Props = {
  review: Review;
}

const ReviewCard: React.FC<Props> = (props: Props) => {
  const {review} = props;
  const {user, rating, feedback, visitTime} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.picture} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating, true)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{feedback}</p>
        <time className="reviews__time" dateTime={getFormattedDate(visitTime, true)}>{getFormattedDate(visitTime, false)}</time>
      </div>
    </li>
  );
};

export default ReviewCard;
