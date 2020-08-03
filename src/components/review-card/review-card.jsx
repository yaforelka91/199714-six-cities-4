import React from 'react';
import {reviewCardTypes} from '../../types/types.js';
import {getRatingInPercent, getFormattedDate} from '../../utils';

const ReviewCard = ({review}) => {
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

ReviewCard.propTypes = reviewCardTypes;

export default ReviewCard;
