import React, {Component} from 'react';
import {offerCardTypes} from '../../types/types.js';
import {capitalize, getRatingInPercent, extend} from '../../utils.js';
import Button from '../button/button.jsx';
import {AppRoute} from '../../const.js';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import history from '../../history.js';

class OfferCard extends Component {
  constructor(props) {
    super(props);

    this._handleCardEnter = this._handleCardEnter.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.offer.isFavorite !== this.props.offer.isFavorite;
  }

  _handleFavoriteClick() {
    const {authorizationStatus, onFavoriteButtonClick, offer} = this.props;

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
    } else {
      onFavoriteButtonClick(extend(offer, {
        isFavorite: +!offer.isFavorite,
      }));
    }
  }

  _handleCardEnter() {
    const {onOfferCardEnter, offer} = this.props;
    onOfferCardEnter(offer.id);
  }

  render() {
    const {
      offer,
      className,
      classNameForImage,
      classNameForInfo,
    } = this.props;

    const {id, title, picture, price, type, isPremium, isFavorite, rating} = offer;

    return (
      <article
        className={`${className ? `${className} ` : ``}place-card`}
        onMouseEnter={this._handleCardEnter}
      >
        {
          isPremium && <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className={`${classNameForImage ? `${classNameForImage} ` : ``}place-card__image-wrapper`}>
          <Link to={`${AppRoute.OFFER}/${id}`}>
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
              onButtonClick={this._handleFavoriteClick}
              className={`place-card__bookmark-button${isFavorite ? ` place-card__bookmark-button--active` : ``}`}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </Button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${getRatingInPercent(rating, true)}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`${AppRoute.OFFER}/${id}`}>
              {title}
            </Link>
          </h2>
          <p className="place-card__type">{capitalize(type)}</p>
        </div>
      </article>
    );
  }
}

OfferCard.defaultProps = {
  onOfferCardEnter: () => {},
  className: ``,
  classNameForImage: ``,
  classNameForInfo: ``,
};

OfferCard.propTypes = offerCardTypes;

export default OfferCard;
