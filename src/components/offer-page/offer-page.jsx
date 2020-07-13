import React from 'react';
import ReviewList from '../review-list/review-list.jsx';
import reviewsList from '../../mocks/reviews.js';
import Map from '../map/map.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import {offerPageTypes} from '../../types/types.js';

const MAX_COUNT_PICTURES = 6;
const MAX_COUNT_MARKERS = 3;

const OfferPage = ({offer, offersList, onOfferTitleClick}) => {
  const {
    id: offerId,
    title,
    description,
    pictures,
    price,
    type,
    isPremium,
    rating,
    bedrooms,
    guests,
    services,
    host,
  } = offer;

  const filteredOffers = offersList.filter(({id}) => id !== offerId).slice(0, MAX_COUNT_MARKERS);
  const offersCoords = [...filteredOffers, offer].map(({id, coords}) => ({id, coords}));

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
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `80%`}}></span>
                <span style={{width: `${Math.round(rating) * 100 / 5}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {`${bedrooms} bedrooms`}
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
                <div className={`property__avatar-wrapper ${host.isSuper && `property__avatar-wrapper--pro`} user__avatar-wrapper`}>
                  <img className="property__avatar user__avatar" src={host.picture} width="74" height="74" alt="Host avatar" />
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
            <section className="property__reviews reviews">
              <ReviewList reviews={reviewsList} />
              <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">Your review</label>
                <div className="reviews__rating-form form__rating">
                  <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                  <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                  <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                  <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                  <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>

                  <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                  <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </div>
                <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                <div className="reviews__button-wrapper">
                  <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                  </p>
                  <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <Map offers={offersCoords} activeCity={offer.city.coords} activeCard={offerId} zoom={offer.city.zoom} className={`property__map`} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList
            offers={filteredOffers}
            onOfferTitleClick={onOfferTitleClick}
            className='near-places__list'
            isNear={true}
          />
        </section>
      </div>
    </main>
  );
};

OfferPage.propTypes = offerPageTypes;

export default OfferPage;
