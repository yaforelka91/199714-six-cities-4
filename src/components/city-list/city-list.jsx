import React from 'react';
import {cityListTypes} from '../../types/types';
import CityListItem from '../city-list-item/city-list-item.jsx';

const CityList = ({citiesList, activeCity, onCityNameClick}) => {
  return (
    <ul className="locations__list tabs__list">
      {
        citiesList
          .map((city)=>(
            <CityListItem
              key={city.id}
              city={city}
              activeCity={activeCity}
              onCityNameClick={onCityNameClick}
            />
          ))
      }
    </ul>
  );
};

CityList.propTypes = cityListTypes;

export default CityList;
