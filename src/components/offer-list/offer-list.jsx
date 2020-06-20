import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';
import {OfferTypes} from '../../const.js';

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
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, index) => {
          return (
            <OfferCard
              key={`${offer.title}-${index}`}
              offer={offer}
              onOfferTitleClick={this._handleTitleClick.bind(this, offer)}
              onOfferCardEnter={this._handleCardMouseEnter.bind(this, offer)}
            />
          );
        })}
      </div>
    );
  }
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf([
          OfferTypes.APARTMENT,
          OfferTypes.ROOM,
          OfferTypes.HOUSE,
          OfferTypes.HOTEL]).isRequired,
        isPremium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default OfferList;
