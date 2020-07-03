import React from 'react';
import {cityListTypes} from '../../types/types';

const CityList = ({citiesList, activeCity, onCityNameClick}) => {
  const handleCityClick = (evt, city) => {
    evt.preventDefault();
    onCityNameClick(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {
        citiesList
          .map((city)=>(
            <li key={city.id} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${city === activeCity ? `tabs__item--active` : ``}`}
                href="#"
                onClick={(evt)=>(handleCityClick(evt, city))}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))
      }
    </ul>
  );
};

CityList.propTypes = cityListTypes;

export default CityList;
