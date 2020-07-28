import React, {PureComponent} from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import {offerListTypes} from '../../types/types.js';
import {getArticleClassName, extend} from '../../utils.js';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation} from '../../reducer/favorites/favorites.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';

import {ActionCreator} from '../../reducer/catalog/catalog.js';
import {AppRoute} from '../../const.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';

class OfferList extends PureComponent {
  componentDidMount() {
    this.props.onDataRequest();
  }

  _handleFavoriteButtonClick(hotel) {
    const {authorizationStatus, onFavoriteButtonClick} = this.props;

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
    } else {
      onFavoriteButtonClick(extend(hotel, {
        isFavorite: +!hotel.isFavorite,
      }), this.props.onDataRequest);
    }
  }

  _handleTitleClick(offerId) {
    const {onOfferTitleClick} = this.props;
    onOfferTitleClick(offerId);
  }

  render() {
    const {
      offers,
      className,
      viewMode,
      authorizationStatus,
      onOfferCardEnter,
    } = this.props;

    return (
      <div className={`${className ? `${className}` : ``}`}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            authorizationStatus={authorizationStatus}
            className={getArticleClassName(viewMode).classNameForArticle}
            classNameForImage={getArticleClassName(viewMode).classNameForImage}
            classNameForInfo={getArticleClassName(viewMode).classNameForInfo}
            onOfferCardEnter={onOfferCardEnter}
            onFavoriteButtonClick={this._handleFavoriteButtonClick.bind(this, offer)}
            onOfferTitleClick={this._handleTitleClick.bind(this, offer.id)}
          />
        ))}
      </div>
    );
  }
}

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
  onOfferTitleClick(offerId) {
    dispatch(ActionCreator.setActiveCard(offerId));
    dispatch(DataOperation.loadNearOffers(offerId));
  }
});

export {OfferList};
export default connect(mapStateToProps, mapDispatchToProps)(OfferList);

