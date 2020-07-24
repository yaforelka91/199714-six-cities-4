import React, {Fragment} from 'react';
import Reviews from '../reviews/reviews.jsx';
import Map from '../map/map.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import Button from '../button/button.jsx';
import {offerPageTypes} from '../../types/types.js';
import {capitalize, extend, getRatingInPercent} from '../../utils.js';
import {connect} from 'react-redux';
import {getNearestOffers, getLoadingStatus} from '../../reducer/data/selectors.js';
import {Operation} from '../../reducer/favorites/favorites.js';
import {CardView} from '../../const.js';
import {getActiveOffer} from '../../reducer/catalog/selectors.js';

const MAX_COUNT_PICTURES = 6;

const OfferPage = ({offer, offersList, onOfferTitleClick, reviews, onFavoriteButtonClick, isLoading}) => {
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

  const offersCoords = [...offersList, offer].map(({id, coords}) => ({id, coords}));

  console.log(offersCoords);
  return (
    <main className="page__main page__main--property">
      {isLoading ? <p>Loading...</p> :
        <Fragment>
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
                    onButtonClick={(activeStatus) => {
                      onFavoriteButtonClick(extend(offer, {
                        isFavorite: activeStatus
                      }));
                    }}
                    className={`property__bookmark-button`}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </Button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
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
                {/* <Reviews className='property__reviews' reviews={reviews} offerId={offerId} /> */}
              </div>
            </div>
            <Map offers={offersCoords} activeCity={offer.city.name} activeCard={offerId} className={`property__map`} />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OfferList
                offers={offersList}
                onOfferTitleClick={onOfferTitleClick}
                className='near-places__list places__list'
                viewMode={CardView.NEAR}
              />
            </section>
          </div>
        </Fragment>
      }
    </main>
  );
};

OfferPage.propTypes = offerPageTypes;

const mapStateToProps = (state) => ({
  offersList: getNearestOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(hotel) {
    dispatch(Operation.changeFavoriteStatus(hotel));
  },
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
