import React from 'react';
import {cityListTypes} from '../../types/types';
import CityListItem from '../city-list-item/city-list-item.jsx';
import {connect} from 'react-redux';
import {getCities} from '../../reducer/data/selectors';

const CityList = ({citiesList, activeCity, onCityNameClick}) => {
  return (
    <ul className="locations__list tabs__list">
      {
        citiesList
            .map((city)=>(
              <CityListItem
                key={city.name}
                city={city}
                activeCity={activeCity.name}
                onCityNameClick={onCityNameClick}
              />
            ))
      }
    </ul>
  );
};

CityList.propTypes = cityListTypes;

const mapStateToProps = (state) => ({
  citiesList: getCities(state),
});


export {CityList};
export default connect(mapStateToProps)(CityList);
