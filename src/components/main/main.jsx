import React from 'react';
import CityList from '../city-list/city-list.jsx';
import {mainTypes} from '../../types/types.js';
import Cities from '../cities/cities.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card.js';

const CitiesWrapped = withActiveCard(Cities);

const Main = ({
  activeCity,
  offersList,
  onOfferTitleClick,
  onCityNameClick
}) => {
  return (
    <main className={`page__main page__main--index${offersList.length === 0 ? ` page__main--index-empty` : ``}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList activeCity={activeCity} onCityNameClick={onCityNameClick} />
        </section>
      </div>
      <CitiesWrapped
        activeCity={activeCity}
        offers={offersList}
        onOfferTitleClick={onOfferTitleClick}
      />
    </main>
  );
};

Main.propTypes = mainTypes;

export default Main;
