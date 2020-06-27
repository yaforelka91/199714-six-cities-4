import React from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../const.js';
import OfferCard from '../offer-card/offer-card.jsx';

const OfferList = ({offers, className, isNear, onOfferTitleClick, onOfferCardEnter}) => {
  return (
    <div className={`places__list ${className}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onOfferTitleClick={onOfferTitleClick}
          onOfferCardEnter={onOfferCardEnter}
          isNear={isNear}
        />
      ))}
    </div>
  );
};

OfferList.defaultProps = {
  onOfferCardEnter: () => {}
};

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
  onOfferCardEnter: PropTypes.func,
};

export default OfferList;
