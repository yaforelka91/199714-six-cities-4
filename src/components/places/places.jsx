
import React from 'react';
import OfferList from '../offer-list/offer-list.jsx';
import {placesTypes} from '../../types/types.js';

const Places = ({offers, city, className, renderSorting, onOfferCardEnter, onOfferTitleClick}) => {
  return (
    <section className={`${className ? `${className} ` : ``}places`}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city}</b>
      {renderSorting()}
      <OfferList
        offers={offers}
        isNear={false}
        className='cities__places-list tabs__content'
        onOfferCardEnter={onOfferCardEnter}
        onOfferTitleClick={onOfferTitleClick}
      />
    </section>
  );
};

Places.defaultProps = {
  className: ``,
};

Places.propTypes = placesTypes;

export default Places;
