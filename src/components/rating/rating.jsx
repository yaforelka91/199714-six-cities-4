import React, {Fragment} from 'react';
import {ratingTypes} from '../../types/types';

const RATING_VALUES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

const Rating = ({selectedRating, onRatingChange}) => {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_VALUES.map((textLabel, index) => {
        const id = RATING_VALUES.length - index;
        return (
          <Fragment key={textLabel}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={`${id}`}
              id={`${id}-star${id === 1 ? `` : `s`}`}
              type="radio"
              checked={id === +selectedRating}
              onChange={onRatingChange}
            />
            <label
              htmlFor={`${id}-star${id === 1 ? `` : `s`}`}
              className="reviews__rating-label form__rating-label"
              title={textLabel}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        );
      })}
    </div>
  );
};

Rating.defaultProps = {
  selectedRating: ``,
};

Rating.propTypes = ratingTypes;

export {Rating};
export default React.memo(Rating);
