import React, {PureComponent} from 'react';
import Map from '../map/map.jsx';
import Places from '../places/places.jsx';
import NoPlaces from '../no-places/no-places.jsx';
import {citiesTypes} from '../../types/types.js';

class Cities extends PureComponent {
  render() {
    const {
      offers,
      activeCity,
      activeCard,
      onOfferCardEnter,
      onOfferTitleClick
    } = this.props;
    return (
      <div className="cities">
        <div className={`cities__places-container container${offers.length === 0 ? ` cities__places-container--empty` : ``}`}>
          {offers.length > 0 ?
            <Places
              className={`cities__places`}
              offers={offers}
              city={activeCity}
              onOfferCardEnter={onOfferCardEnter}
              onOfferTitleClick={onOfferTitleClick}
            /> :
            <NoPlaces city={activeCity.name} />
          }
          <div className="cities__right-section">
            {offers.length > 0 &&
              <Map
                offers={offers}
                activeCity={activeCity.coords}
                zoom={activeCity.zoom}
                activeCard={activeCard}
                className={`cities__map`}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

Cities.propTypes = citiesTypes;

export default Cities;
