import React from 'react';
import {cityListItemTypes} from '../../types/types';

const CityListItem = ({city, onCityNameClick, activeCity}) => {
  return (
    <li key={city.id} className="locations__item">
      <a
        className={`locations__item-link tabs__item${city === activeCity ? ` tabs__item--active` : ``}`}
        href="#"
        onClick={() => (onCityNameClick(city))}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
};

CityListItem.propTypes = cityListItemTypes;

export default CityListItem;
