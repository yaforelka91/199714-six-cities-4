import React from 'react';
import PropTypes from 'prop-types';
import {OfferTypes} from '../../const.js';

const OfferCard = ({offer, onOfferTitleClick, onOfferCardEnter}) => {
  const {title, picture, price, type, isPremium, rating} = offer;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={
        () => {
          onOfferCardEnter(offer);
        }}
    >
      {
        isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
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
          <a href="#" onClick={onOfferTitleClick}>{title}</a>
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
      OfferTypes.APARTMENT,
      OfferTypes.ROOM,
      OfferTypes.HOUSE,
      OfferTypes.HOTEL]).isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onOfferCardEnter: PropTypes.func.isRequired,
};

export default OfferCard;
