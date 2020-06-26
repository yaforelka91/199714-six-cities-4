import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../const.js';
import OfferCard from '../offer-card/offer-card.jsx';
class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  _handleCardMouseEnter(offer) {
    this.setState({
      activeCard: offer,
    });
  }

  _handleTitleClick(offer, evt) {
    evt.preventDefault();

    const {onOfferTitleClick} = this.props;

    onOfferTitleClick(offer);
  }

  render() {
    const {offers, className, isNear} = this.props;
    return (
      <div className={`places__list ${className}`}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onOfferTitleClick={this._handleTitleClick.bind(this, offer)}
            onOfferCardEnter={!isNear ? this._handleCardMouseEnter.bind(this, offer) : undefined}
            isNear={isNear}
          />
        ))}
      </div>
    );
  }
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
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
  isNear: PropTypes.bool.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default OfferList;
