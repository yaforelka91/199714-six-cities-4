import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {OfferType, ListType} from '../../const.js';
import OfferCardCities from '../offer-card-cities/offer-card-cities.jsx';
import OfferCardNear from '../offer-card-near/offer-card-near.jsx';
import OfferCard from '../offer-card/offer-card.jsx';
class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  _handleTitleClick(offer, evt) {
    evt.preventDefault();

    const {onOfferTitleClick} = this.props;

    onOfferTitleClick(offer);
  }

  _handleCardMouseEnter(offer) {
    this.setState({
      activeCard: offer,
    });
  }

  render() {
    const {offers, className, listType} = this.props;
    const getComponentByType = (type, offer) => {
      switch (type) {
        case ListType.CITIES:
          return (
            <OfferCardCities
              offer={offer}
              onOfferTitleClick={this._handleTitleClick.bind(this, offer)}
              onOfferCardEnter={this._handleCardMouseEnter.bind(this, offer)}
            />
          );
        case ListType.NEAR:
          return (
            <OfferCardNear
              offer={offer}
              onOfferTitleClick={this._handleTitleClick.bind(this, offer)}
            />
          );
        default:
          return (
            <OfferCard
              offer={offer}
              onOfferTitleClick={this._handleTitleClick.bind(this, offer)}
            />
          );
      }
    };
    return (
      <div className={`places__list ${className}`}>

        {offers.map((offer) => (
          <Fragment key={offer.id}>
            {getComponentByType(listType, offer)}
          </Fragment>
        ))}
      </div>
    );
  }
}

OfferList.defaultProps = {
  className: ``,
};

OfferList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf([
          OfferType.APARTMENT,
          OfferType.ROOM,
          OfferType.HOUSE,
          OfferType.HOTEL]).isRequired,
        isPremium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,
  className: PropTypes.string,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default OfferList;
