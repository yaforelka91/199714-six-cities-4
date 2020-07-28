import PropTypes from 'prop-types';
import {CardView} from '../const';

export const offerShape = PropTypes.shape({
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  guests: PropTypes.number.isRequired,
  services: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    isSuper: PropTypes.bool.isRequired,
  }),
});

export const cityShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
});

export const reviewShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  rating: PropTypes.number.isRequired,
  feedback: PropTypes.string.isRequired,
  visitTime: PropTypes.string.isRequired,
});

export const appTypes = {
  activeCard: PropTypes.oneOfType([offerShape, PropTypes.bool]).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export const buttonTypes = {
  className: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export const citiesTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired,
  activeCity: PropTypes.string.isRequired,
  activeItem: PropTypes.number.isRequired,
  onActiveChange: PropTypes.func.isRequired,
};

export const cityListTypes = {
  citiesList: PropTypes.arrayOf(cityShape).isRequired,
  activeCity: cityShape.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const cityListItemTypes = {
  city: PropTypes.string.isRequired,
  classNameLink: PropTypes.string.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const headerTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isMain: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export const loginTypes = {
  activeCity: PropTypes.string.isRequired,
  validationError: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export const mainTypes = {
  offersList: PropTypes.arrayOf(offerShape).isRequired,
  activeCity: PropTypes.string.isRequired,
  citiesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  errorType: PropTypes.string.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const mapTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
  ).isRequired,
  activeCard: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export const noPlacesTypes = {
  city: PropTypes.string.isRequired,
};

export const offerCardTypes = {
  offer: offerShape.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  classNameForImage: PropTypes.string.isRequired,
  classNameForInfo: PropTypes.string.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onOfferCardEnter: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

export const offerListTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  viewMode: PropTypes.oneOf([CardView.CITIES, CardView.NEAR, CardView.FAVORITES]).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onOfferCardEnter: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

export const offerPageTypes = {
  offer: offerShape.isRequired,
  offersList: PropTypes.arrayOf(offerShape).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

export const pageTypes = {
  className: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    email: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isMain: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export const placesTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired,
  city: PropTypes.string.isRequired,
  renderSorting: PropTypes.func.isRequired,
  className: PropTypes.string,
  onOfferCardEnter: PropTypes.func.isRequired,
};

export const ratingTypes = {
  selectedRating: PropTypes.string.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

export const reviewCardTypes = {
  review: reviewShape.isRequired,
};

export const reviewFormTypes = {
  offerId: PropTypes.number.isRequired,
  serverError: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  renderRating: PropTypes.func.isRequired,
  renderTextarea: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export const reviewsTypes = {
  reviews: PropTypes.arrayOf(reviewShape).isRequired,
  reviewsCount: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offerId: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  onReviewFormSubmit: PropTypes.func.isRequired,
};

export const sortingTypes = {
  activeSorting: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSortItemClick: PropTypes.func.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  onSelectMenu: PropTypes.func.isRequired,
};

export const tabsTypes = {
  activeItem: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onActiveChange: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  classNameForList: PropTypes.string.isRequired,
};

export const textareaTypes = {
  currentMessage: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  onTextareaChange: PropTypes.func.isRequired,
};
