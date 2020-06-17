import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';
import {OfferTypes} from '../../const.js';

class OfferList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  render() {
    const {offers, onOfferTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, index) => {
          return (
            <OfferCard
              key={`${offer.title}-${index}`}
              offer={offer}
              onOfferTitleClick={onOfferTitleClick}
              onOfferCardEnter={() => {
                this.setState({
                  activeCard: offer,
                });
              }}
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
