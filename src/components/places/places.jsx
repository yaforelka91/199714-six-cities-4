
import React from 'react';
import OfferList from '../offer-list/offer-list';
import {placesTypes} from '../../types/types.js';
import {CardView} from '../../const';

const Places = ({offers, city, className, renderSorting, onOfferCardEnter}) => {
  return (
    <section className={`${className ? `${className} ` : ``}places`}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city}</b>
      {renderSorting()}
      <OfferList
        offers={offers}
        className='cities__places-list places__list tabs__content'
        viewMode={CardView.CITIES}
        onOfferCardEnter={onOfferCardEnter}
      />
    </section>
  );
};

Places.defaultProps = {
  className: ``,
};

Places.propTypes = placesTypes;

export default Places;
