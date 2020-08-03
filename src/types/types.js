import PropTypes, {shape} from 'prop-types';
import {history as historyPropTypes} from 'history-prop-types';
import {CardView} from '../const';

export const offerShape = PropTypes.shape({
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  offerZoom: PropTypes.number.isRequired,
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
  authorizationStatus: PropTypes.string.isRequired,
  favoriteOffers: PropTypes.arrayOf(shape({
    [PropTypes.string.isRequred]: PropTypes.arrayOf(offerShape)
  })).isRequired,
  offers: PropTypes.arrayOf(offerShape).isRequired,
  isOffersLoading: PropTypes.bool.isRequired,
  isAuthorizationInProgress: PropTypes.bool.isRequired,
  errorType: PropTypes.string.isRequired,
  history: PropTypes.shape(historyPropTypes).isRequired,
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
  cityLocation: PropTypes.shape({
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  onActiveChange: PropTypes.func.isRequired,
};

export const cityListItemTypes = {
  city: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  classNameLink: PropTypes.string.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const errorScreenTypes = {
  isNotFound: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export const favoritesTypes = {
  offers: PropTypes.arrayOf(shape({
    [PropTypes.string.isRequred]: PropTypes.arrayOf(offerShape)
  })).isRequired,
  onCityNameClick: PropTypes.func.isRequired,
  onFavoritesRequest: PropTypes.func.isRequired,
};

export const footerTypes = {};

export const headerTypes = {
  authorizationStatus: PropTypes.string.isRequired,
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
  cityLocation: PropTypes.shape({
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

export const mapTypes = {
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
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
  city: PropTypes.string,
};

export const offerCardTypes = {
  offer: offerShape.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  classNameForImage: PropTypes.string.isRequired,
  classNameForInfo: PropTypes.string.isRequired,
  onOfferCardEnter: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

export const offerListTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  viewMode: PropTypes.oneOf([CardView.CITIES, CardView.NEAR, CardView.FAVORITES]).isRequired,
  onOfferCardEnter: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

export const offerPageTypes = {
  offer: offerShape.isRequired,
  offersList: PropTypes.arrayOf(offerShape).isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  onReviewsRequest: PropTypes.func.isRequired,
  onNearbyRequest: PropTypes.func.isRequired,
};

export const pageTypes = {
  className: PropTypes.string.isRequired,
  hasFooter: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  renderPage: PropTypes.func.isRequired,
};

export const placesTypes = {
  offers: PropTypes.arrayOf(offerShape).isRequired,
  city: PropTypes.string.isRequired,
  renderSorting: PropTypes.func.isRequired,
  className: PropTypes.string,
  onOfferCardEnter: PropTypes.func.isRequired,
};

export const privateRouteTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  isAuthorizationInProgress: PropTypes.bool.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
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
