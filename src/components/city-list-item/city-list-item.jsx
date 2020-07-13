import React from 'react';
import {cityListItemTypes} from '../../types/types';

const CityListItem = ({city, onCityNameClick, activeCity}) => {
  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${city.name === activeCity ? `tabs__item--active` : ``}`}
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          onCityNameClick(city);
        }}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
};

CityListItem.propTypes = cityListItemTypes;

export default CityListItem;
