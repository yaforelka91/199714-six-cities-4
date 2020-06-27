import React from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../const.js';

const OfferCard = ({offer, onOfferTitleClick, onOfferCardEnter, isNear}) => {
  const {title, picture, price, type, isPremium, rating} = offer;

  const handleCardMouseEnter = () => {
    if (isNear) {
      return;
    }
    onOfferCardEnter(offer);
  };

  const handleTitleClick = (offerData, evt) => {
    evt.preventDefault();
    onOfferTitleClick(offerData);
  };

  return (
    <article
      className={`place-card ${isNear ? `near-places__card` : `cities__place-card`}`}
      onMouseEnter={handleCardMouseEnter}
    >
      {
        isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`place-card__image-wrapper ${isNear ? `near-places__image-wrapper` : `cities__image-wrapper`}`}>
        <a href="#">
          <img className="place-card__image" src={picture} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            href="#"
            onClick={(evt) => handleTitleClick(offer, evt)}
          >
            {title}
          </a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
      OfferType.APARTMENT,
      OfferType.ROOM,
      OfferType.HOUSE,
      OfferType.HOTEL]).isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  isNear: PropTypes.bool.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onOfferCardEnter: PropTypes.func.isRequired,
};

export default OfferCard;
