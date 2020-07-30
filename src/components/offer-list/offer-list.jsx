import React from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import {offerListTypes} from '../../types/types.js';
import {getArticleClassName} from '../../utils.js';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation} from '../../reducer/favorites/favorites.js';

const OfferList = ({
  offers,
  className,
  viewMode,
  authorizationStatus,
  onOfferCardEnter,
  onFavoriteButtonClick,
}) => {
  return (
    <div className={`${className}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          authorizationStatus={authorizationStatus}
          className={getArticleClassName(viewMode).classNameForArticle}
          classNameForImage={getArticleClassName(viewMode).classNameForImage}
          classNameForInfo={getArticleClassName(viewMode).classNameForInfo}
          onOfferCardEnter={onOfferCardEnter}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      ))}
    </div>
  );
};

OfferList.defaultProps = {
  onOfferCardEnter: () => {},
  className: ``,
  viewMode: ``
};

OfferList.propTypes = offerListTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(hotel, callback) {
    dispatch(Operation.changeFavoriteStatus(hotel, callback));
  },
});

export {OfferList};
export default connect(mapStateToProps, mapDispatchToProps)(OfferList);

