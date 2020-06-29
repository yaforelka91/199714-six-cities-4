import React from 'react';

const CityList = ({citiesList, activeCity, onCityNameClick}) => {
  const handleCityClick = (evt, city) => {
    evt.preventDefault();
    onCityNameClick(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {
        citiesList.map((city)=>(
          <li key={city.id} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${city.id === activeCity.id ? `tabs__item--active` : ``}`}
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

export default CityList;
