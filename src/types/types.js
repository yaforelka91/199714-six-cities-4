import PropTypes from 'prop-types';
import {OfferType} from '../const.js';

export const offerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    OfferType.APARTMENT,
    OfferType.ROOM,
    OfferType.HOUSE,
    OfferType.HOTEL]).isRequired,
  isPremium: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  bedrooms: PropTypes.string.isRequired,
  guests: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    isSuper: PropTypes.bool.isRequired,
  }),
  reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const cityShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
});

export const reviewShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  rating: PropTypes.number.isRequired,
  feedback: PropTypes.string.isRequired,
  visitTime: PropTypes.string.isRequired,
});

export const appTypes = {
  offersList: PropTypes.arrayOf(offerShape).isRequired,
  city: cityShape.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const cityListTypes = {
  citiesList: PropTypes.arrayOf(cityShape).isRequired,
  activeCity: cityShape.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const mainTypes = {
  offersList: PropTypes.arrayOf(offerShape).isRequired,
  city: cityShape.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const mapTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        coords: PropTypes.arrayOf(PropTypes.number.isRequired),
      }).isRequired
  ).isRequired,
  activeCity: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export const offerCardTypes = {
  offer: offerShape.isRequired,
  isNear: PropTypes.bool.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onOfferCardEnter: PropTypes.func.isRequired,
};

export const offerListTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired,
  className: PropTypes.string.isRequired,
  isNear: PropTypes.bool.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onOfferCardEnter: PropTypes.func,
};

export const offerPageTypes = {
  offer: offerShape.isRequired,
  offersList: PropTypes.arrayOf(offerShape).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export const reviewCardTypes = {
  review: reviewShape.isRequired,
};

export const reviewListTypes = {
  reviews: PropTypes.arrayOf(reviewShape).isRequired,
};
