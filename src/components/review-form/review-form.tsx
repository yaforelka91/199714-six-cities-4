import * as React from 'react';

type Props = {
  serverError?: string;
  isValid?: boolean;
  isLoading?: boolean;
  renderRating: () => void;
  renderTextarea: () => void;
  onFormSubmit: () => void;
}

const ReviewForm: React.FC<Props> = (props: Props) => {
  const {
    isValid = false,
    isLoading = false,
    serverError = ``,
    renderRating,
    renderTextarea,
    onFormSubmit
  } = props;

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

export default ReviewForm;
