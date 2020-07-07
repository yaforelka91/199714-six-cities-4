import React, {PureComponent} from 'react';
import Sorting from '../sorting/sorting.jsx';
import withOpenMenu from '../../hocs/with-open-menu/with-open-menu.js';
import OfferList from '../offer-list/offer-list.jsx';
import Map from '../map/map.jsx';
import withOSortedItems from '../../hocs/with-sorted-items/with-sorted-items.js';
import {citiesTypes} from '../../types/types.js';

const SortingWrapped = withOpenMenu(Sorting);
const OfferListWrapped = withOSortedItems(OfferList);

class Cities extends PureComponent {
  render() {
    const {offers, city, activeCard, onOfferCardEnter, activeSorting, onOfferTitleClick} = this.props;
    return (
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
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
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map
                offers={offers.map(({id: offerId, coords}) => ({offerId, coords}))}
                activeCity={city.coords}
                activeCard={activeCard}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

Cities.propTypes = citiesTypes;

export default Cities;
