import React from 'react';
import {reviewFormTypes} from '../../types/types.js';

const ReviewForm = ({isValid, isLoading, serverError, renderRating, renderTextarea, onFormSubmit}) => {
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      {renderRating()}
      {renderTextarea()}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isLoading}>Submit</button>
      </div>
      {serverError && <p>{serverError}</p>}
    </form>
  );
};

ReviewForm.defaultProps = {
  serverError: ``,
  isValid: false,
  isLoading: false,
};

ReviewForm.propTypes = reviewFormTypes;

export default ReviewForm;
