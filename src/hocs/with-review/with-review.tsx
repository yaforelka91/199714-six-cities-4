import * as React from 'react';
import Rating from '../../components/rating/rating';
import Textarea from '../../components/textarea/textarea';
import adaptError from '../../adapters/error.js';
import {Error} from '../../api.js';

const ReviewValidLength = {
  MINIMUM: 50,
  MAXIMUM: 300,
};

type State = {
  rating: string;
  review: string;
  isLoading: boolean;
  serverError: string;
}

type Props = {
  offerId: number;
  onReviewFormSubmit: (commentData: {rating: number; comment: string}, hotelId: number) => Promise<void>;
}

const withReview = (Component) => {
  class WithReview extends React.PureComponent<Props, State> {
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

    componentDidUpdate(prevProps) {
      if (prevProps.offerId !== this.props.offerId) {
        this.setState({
          review: ``,
          rating: ``,
          serverError: ``,
        });
      }
    }

    _handleControlChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      this.setState({
        [evt.currentTarget.name]: evt.currentTarget.value,
      } as unknown as Pick<State, keyof State>);
    }

    _handleFormSubmit(evt: React.SyntheticEvent<HTMLFormElement>) {
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
        if (err.response.status === Error.BAD_REQUEST) {
          this.setState({
            serverError: adaptError(err.response.data.error),
          });
        }

        if (err.response.status === Error.UNAUTHORIZED) {
          this.setState({
            serverError: err.response.data.error,
          });
        }
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
          renderRating={() =>
            <Rating
              selectedRating={rating}
              onRatingChange={this._handleControlChange}
            />
          }
          renderTextarea={() =>
            <Textarea
              currentMessage={review}
              maxLength={ReviewValidLength.MAXIMUM}
              onTextareaChange={this._handleControlChange}
            />
          }
          serverError={serverError}
          isLoading={isLoading}
          isValid={rating !== `` && review.length >= ReviewValidLength.MINIMUM && review.length <= ReviewValidLength.MAXIMUM}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
