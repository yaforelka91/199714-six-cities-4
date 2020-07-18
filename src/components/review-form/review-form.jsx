import React, {PureComponent, Fragment} from 'react';
import {reviewFormTypes} from '../../types/types.js';

const RATING_VALUES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
const CommentLength = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 300,
};

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCommentChange = this._handleCommentChange.bind(this);
    this._handleRatingChange = this._handleRatingChange.bind(this);

    this.state = {
      comment: ``,
      rating: ``,
      isValid: false,
    };

    this._requestInProgress = false;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    const {onReviewFormSubmit, offerId} = this.props;

    onReviewFormSubmit({
      comment: this.state.comment,
      rating: +this.state.rating,
    }, offerId);

    // this.setState({
    //   comment: ``,
    //   rating: ``,
    //   isValid: false,
    // });
  }

  _handleCommentChange(evt) {
    this.setState({
      comment: evt.target.value,
      isValid: this.state.rating !== ``
      && evt.target.value.length >= CommentLength.MIN_LENGTH
      && evt.target.value.length <= CommentLength.MAX_LENGTH,
    });
  }

  _handleRatingChange(evt) {
    this.setState({
      rating: evt.target.value,
      isValid: evt.target.value !== ``
      && this.state.comment.length >= CommentLength.MIN_LENGTH
      && this.state.comment.length <= CommentLength.MAX_LENGTH,
    });
  }

  _createRadioItems() {
    return (
      RATING_VALUES.map((textLabel, index) => {
        const id = RATING_VALUES.length - index;
        return (
          <Fragment key={textLabel}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={id}
              id={`${id} star${id === 1 ? `` : `s`}`}
              type="radio"
              checked={id === +this.state.rating}
              onChange={this._handleRatingChange}
            />
            <label
              htmlFor={`${id} star${id === 1 ? `` : `s`}`}
              className="reviews__rating-label form__rating-label"
              title={textLabel}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        );
      })
    );
  }

  render() {
    const {serverError} = this.props;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._handleFormSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {this._createRadioItems(this._ratingRef)}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" value={this.state.comment} placeholder="Tell how was your stay, what you like and what can be improved" onChange={this._handleCommentChange} />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!this.state.isValid || this._requestInProgress}>Submit</button>
        </div>
        {serverError !== `` ? <p>{serverError}</p> : ``}
      </form>
    );
  }
}

ReviewForm.defaultTypes = {
  serverError: ``,
};

ReviewForm.propTypes = reviewFormTypes;

export default ReviewForm;
