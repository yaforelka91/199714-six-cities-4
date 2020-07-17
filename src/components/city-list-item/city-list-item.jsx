import React from 'react';
import {cityListItemTypes} from '../../types/types';

const CityListItem = ({city, onCityNameClick, classNameLink}) => {
  return (
    <li className="locations__item">
      <a
        className={`locations__item-link${classNameLink ? ` ${classNameLink}` : ``}`}
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          onCityNameClick(city);
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

CityListItem.defaultProps = {
  classNameLink: ``,
  onCityNameClick: () => {},
};

CityListItem.propTypes = cityListItemTypes;

export default CityListItem;
