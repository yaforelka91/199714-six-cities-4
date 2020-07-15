
import React from 'react';
import Sorting from '../sorting/sorting.jsx';
import withOpenMenu from '../../hocs/with-open-menu/with-open-menu.js';
import OfferList from '../offer-list/offer-list.jsx';
import withOSortedItems from '../../hocs/with-sorted-items/with-sorted-items.js';
import {placesTypes} from '../../types/types.js';

const SortingWrapped = withOpenMenu(Sorting);
const OfferListWrapped = withOSortedItems(OfferList);

const Places = ({offers, city, onOfferCardEnter, activeSorting, onOfferTitleClick, className}) => {
  return (
    <section className={`${className ? `${className} ` : ``}places`}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city.name}</b>
      <SortingWrapped />
      <OfferListWrapped
        activeSorting={activeSorting}
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
