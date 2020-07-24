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
import {Link} from 'react-router-dom';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {Operation as ReviewsOperation} from '../../reducer/reviews/reviews.js';

const OfferCard = ({
  offer,
  onOfferTitleClick,
  onOfferCardEnter,
  onFavoriteButtonClick,
  authorizationStatus,
  className,
  classNameForImage,
  classNameForInfo,
}) => {
  const {id, title, picture, price, type, isPremium, isFavorite, rating} = offer;

  const handleCardMouseEnter = () => {
    onOfferCardEnter(id);
  };

  const handleTitleClick = () => {
    // evt.preventDefault();
    console.log(`from Card`);
    // history.push(`${AppRoute.OFFER}/${id}`);
    onOfferTitleClick(id);
  };

  return (
    <article
      className={`${className ? `${className} ` : ``}place-card`}
      onMouseEnter={handleCardMouseEnter}
    >
      {
        isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${classNameForImage ? `${classNameForImage} ` : ``}place-card__image-wrapper`}>
        <Link to={`${AppRoute.OFFER}/${id}`} onClick={handleTitleClick}>
          <img className="place-card__image" src={picture} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className={`${classNameForInfo ? `${classNameForInfo} ` : ``}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Button
            activeItem={Number(isFavorite)}
            onButtonClick={(activeStatus) => {
              console.log(authorizationStatus);
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
          <Link to={`${AppRoute.OFFER}/${id}`} onClick={handleTitleClick}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

OfferCard.defaultProps = {
  onOfferCardEnter: () => {},
  className: ``,
  classNameForImage: ``,
  classNameForInfo: ``,
};

OfferCard.propTypes = offerCardTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(hotel) {
    dispatch(Operation.changeFavoriteStatus(hotel));
  },
  onOfferTitleClick(offerId) {
    dispatch(DataOperation.loadNearOffers(offerId));
    dispatch(ReviewsOperation.loadReviews(offerId));
  }
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
