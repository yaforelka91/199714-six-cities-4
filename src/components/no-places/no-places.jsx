import React from 'react';
import {noPlacesTypes} from '../../types/types.js';

const NoPlaces = ({city}) => {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">
          No places to stay available
        </b>
        <p className="cities__status-description">{`We could not find any property availbale at the moment${city ? ` in ${city}` : ``}`}</p>
      </div>
    </section>
  );
};

NoPlaces.propTypes = noPlacesTypes;

export default NoPlaces;
