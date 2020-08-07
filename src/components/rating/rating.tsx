import React, {memo} from 'react';

const RATING_VALUES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

type Props = {
  onRatingChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRating?: string;
}

const Rating: React.FC<Props> = (props: Props) => {
  const {onRatingChange, selectedRating = ``} = props;

  return (
    <div className="reviews__rating-form form__rating">
      {RATING_VALUES.map((textLabel, index) => {
        const id = RATING_VALUES.length - index;
        return (
          <React.Fragment key={textLabel}>
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
          </React.Fragment>
        );
      })}
    </div>
  );
};


export {Rating};
export default memo(Rating);
