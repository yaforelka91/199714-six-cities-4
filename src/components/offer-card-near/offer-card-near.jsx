import React from 'react';
import PropTypes from 'prop-types';
import {OfferType} from '../../const.js';
import OfferCard from '../offer-card/offer-card.jsx';

const OfferCardNear = (props) => {
  const className = `near-places__card ${props.className}`;
  delete props.className;

  return (
    <OfferCard className={className} {...props} />
  );
};

// OfferCard.defaultProps = {
//   className: ``,
// };

// OfferCard.propTypes = {
//   offer: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     picture: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     type: PropTypes.oneOf([
//       OfferType.APARTMENT,
//       OfferType.ROOM,
//       OfferType.HOUSE,
//       OfferType.HOTEL]).isRequired,
//     isPremium: PropTypes.bool.isRequired,
//     rating: PropTypes.number.isRequired,
//   }).isRequired,
//   // className: PropTypes.string,
//   onOfferTitleClick: PropTypes.func.isRequired,
// };

export default OfferCardNear;
