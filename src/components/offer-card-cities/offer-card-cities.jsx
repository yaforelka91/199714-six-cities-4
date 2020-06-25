import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

const OfferCardCities = (props) => {
  const className = `cities__place-card ${props.className}`;
  delete props.className;

  return (
    <OfferCard className={className} {...props} />
  );
};

export default OfferCardCities;
