import React from 'react';
import {offerCardTypes} from '../../types/types.js';
import {capitalize, extend, getRatingInPercent} from '../../utils.js';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/favorites/favorites.js';
import Button from '../button/button.jsx';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';

const OfferCard = ({offer, onOfferTitleClick, onOfferCardEnter, onFavoriteButtonClick, isNear, authorizationStatus}) => {
  const {title, picture, price, type, isPremium, isFavorite, rating} = offer;

  const handleCardMouseEnter = () => {
    if (isNear) {
      return;
    }
    onOfferCardEnter(offer.id);
  };

  const handleTitleClick = (evt) => {
    evt.preventDefault();
    onOfferTitleClick(offer.id);
  };

  return (
    <article
      className={`place-card${isNear ? ` near-places__card` : ` cities__place-card`}`}
      onMouseEnter={handleCardMouseEnter}
    >
      {
        isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`place-card__image-wrapper${isNear ? ` near-places__image-wrapper` : ` cities__image-wrapper`}`}>
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
          <Button
            activeItem={Number(isFavorite)}
            onButtonClick={(activeStatus) => {
              if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                history.push(AppRoute.LOGIN);
              } else {
                onFavoriteButtonClick(extend(offer, {
                  isFavorite: activeStatus
                }));
              }
            }}
            className={`place-card__bookmark-button`}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </Button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            href="#"
            onClick={handleTitleClick}
          >
            {title}
          </a>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

OfferCard.defaultProps = {
  onOfferCardEnter: () => {},
};

OfferCard.propTypes = offerCardTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(hotel) {
    dispatch(Operation.changeFavoriteStatus(hotel));
  },
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
