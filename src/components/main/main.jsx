import React from 'react';
import CityList from '../city-list/city-list.jsx';
import {mainTypes} from '../../types/types.js';
import Cities from '../cities/cities.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const CitiesWrapped = withActiveItem(Cities);

const Main = ({
  activeSorting,
  offersList,
  citiesList,
  city,
  onCityNameClick,
  onOfferTitleClick,
}) => {
  return (
    <main className={`page__main page__main--index${offersList.length === 0 ? ` page__main--index-empty` : ``}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList
            citiesList={citiesList}
            activeCity={city}
            onCityNameClick={onCityNameClick}
          />
        </section>
      </div>
      <CitiesWrapped
        offers={offersList}
        onOfferTitleClick={onOfferTitleClick}
        city={city}
        activeSorting={activeSorting}
      />
    </main>
  );
};

Main.propTypes = mainTypes;

export default Main;
