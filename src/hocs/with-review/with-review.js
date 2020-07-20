import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Rating from '../../components/rating/rating.jsx';
import Textarea from '../../components/textarea/textarea.jsx';
import adaptError from '../../adapters/error.js';

const ReviewValidLength = {
  MINIMUM: 50,
  MAXIMUM: 300,
};

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: ``,
        review: ``,
        isLoading: false,
        serverError: ``,
      };

      this._handleControlChange = this._handleControlChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _handleControlChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();

      const {onReviewFormSubmit, offerId} = this.props;

      this.setState({
        isLoading: true,
      });

      const response = onReviewFormSubmit({
        comment: this.state.review,
        rating: +this.state.rating,
      }, offerId);

      response.then(() => {
        this.setState({
          review: ``,
          rating: ``,
          serverError: ``,
        });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          this.setState({
            serverError: adaptError(err.response.data.error),
          });

          return;
        }

        if (err.response.status === 401) {
          this.setState({
            serverError: err.response.data.error,
          });

          return;
        }

        throw err;
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
    }

    render() {
      const {rating, review, isLoading, serverError} = this.state;

      return (
        <Component
          {...this.props}
          onFormSubmit={this._handleFormSubmit}
          renderRating={() => {
            return (
              <Rating
                selectedRating={rating}
                onRatingChange={this._handleControlChange}
              />
            );
          }}
          renderTextarea={() => {
            return (
              <Textarea
                currentMessage={review}
                onTextareaChange={this._handleControlChange}
              />
            );
          }}
          serverError={serverError}
          isLoading={isLoading}
          isValid={rating !== `` && review.length >= ReviewValidLength.MINIMUM && review.length <= ReviewValidLength.MAXIMUM}
        />
      );
    }
  }

  WithReview.propTypes = {
    offerId: PropTypes.number.isRequired,
    onReviewFormSubmit: PropTypes.func.isRequired,
  };

  return WithReview;
};

export default withReview;
