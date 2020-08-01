import React, {PureComponent} from 'react';
import Reviews from '../reviews/reviews.jsx';
import Map from '../map/map.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import Button from '../button/button.jsx';
import {offerPageTypes} from '../../types/types.js';
import {capitalize, extend, getRatingInPercent} from '../../utils.js';
import {connect} from 'react-redux';
import {getNearestOffers} from '../../reducer/data/selectors.js';
import {CardView, AppRoute} from '../../const.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation as ReviewsOperation} from '../../reducer/reviews/reviews.js';
import {ActionCreator as CatalogActionCreator} from '../../reducer/catalog/catalog.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import history from '../../history.js';

const MAX_COUNT_PICTURES = 6;

class OfferPage extends PureComponent {
  componentDidMount() {
    const {offer, onReviewsRequest, onNearbyRequest, onSetActiveOffer} = this.props;
    onSetActiveOffer(offer.id);
    onReviewsRequest(offer.id);
    onNearbyRequest(offer.id);
  }

  componentDidUpdate(prevProps) {
    const {offer, onReviewsRequest, onNearbyRequest, onSetActiveOffer} = this.props;

    if (prevProps.offer.id !== offer.id) {
      onSetActiveOffer(offer.id);
      onReviewsRequest(offer.id);
      onNearbyRequest(offer.id);
    }
  }

  render() {
    const {offer, offersList, authorizationStatus, onFavoriteButtonClick} = this.props;

    const {
      id: offerId,
      title,
      description,
      pictures,
      price,
      type,
      isPremium,
      isFavorite,
      rating,
      bedrooms,
      guests,
      services,
      host,
    } = offer;

    let offersCoords = [];
    if (offersList.length > 0) {
      offersCoords = [...offersList, offer].map(({id, coords}) => ({id, coords}));
    } else {
      offersCoords = [offer].map(({id, coords}) => ({id, coords}));
    }

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                pictures
                  .slice(0, MAX_COUNT_PICTURES)
                  .map((picture, index) => {
                    return (
                      <div className="property__image-wrapper" key={`${picture}-${index}`}>
                        <img className="property__image" src={picture} alt="Photo studio" />
                      </div>
                    );
                  })
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {
                isPremium &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <Button
                  activeItem={Number(isFavorite)}
                  className={`property__bookmark-button${isFavorite ? ` property__bookmark-button--active` : ``}`}
                  onButtonClick={() => {
                    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                      history.push(AppRoute.LOGIN);
                    } else {
                      onFavoriteButtonClick(extend(offer, {
                        isFavorite: +!offer.isFavorite,
                      }));
                    }
                  }}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </Button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingInPercent(rating, false)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalize(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} ${capitalize(`bedrooms`)}`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${guests} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    services.map((service, index) => {
                      return (
                        <li className="property__inside-item" key={`${service}-${index}`}>
                          {service}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper${host.isSuper && ` property__avatar-wrapper--pro`} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={`/${host.picture}`} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  {
                    description.map((text, index) => {
                      return (
                        <p className="property__text" key={`${text}-${index}`}>
                          {text}
                        </p>
                      );
                    })
                  }
                </div>
              </div>
              <Reviews
                className='property__reviews'
                offerId={offerId}
              />
            </div>
          </div>
          <Map offers={offersCoords} activeCity={offer.city.name} activeCard={offerId} className={`property__map`} />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              offers={offersList}
              className='near-places__list places__list'
              viewMode={CardView.NEAR}
            />
          </section>
        </div>
      </main>
    );
  }
}

OfferPage.propTypes = offerPageTypes;

const mapStateToProps = (state) => ({
  offersList: getNearestOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onNearbyRequest(offerId) {
    dispatch(DataOperation.loadNearOffers(offerId));
  },
  onReviewsRequest(offerId) {
    dispatch(ReviewsOperation.loadReviews(offerId));
  },
  onSetActiveOffer(offerId) {
    dispatch(CatalogActionCreator.setActiveCard(offerId));
  },
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
