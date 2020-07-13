import React from 'react';
import {noPlacesTypes} from '../../types/types.js';

const NoPlaces = ({city, isError}) => {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">
          {isError ? `Sorry, something went wrong :( Please, try later.` : `No places to stay available`}
        </b>
        {!isError && <p className="cities__status-description">We could not find any property availbale at the moment in {city}</p>}
      </div>
    </section>
  );
};

NoPlaces.defaultProps = {
  isError: false,
};

NoPlaces.propTypes = noPlacesTypes;

export default NoPlaces;
