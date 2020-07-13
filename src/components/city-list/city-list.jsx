import React, {PureComponent} from 'react';
import {cityListTypes} from '../../types/types';
import CityListItem from '../city-list-item/city-list-item.jsx';

class CityList extends PureComponent {
  render() {
    const {citiesList, activeCity, onCityNameClick} = this.props;

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
  }

}

CityList.propTypes = cityListTypes;

export default CityList;
