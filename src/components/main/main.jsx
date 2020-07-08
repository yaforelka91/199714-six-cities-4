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
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
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
    </div>
  );
};

Main.propTypes = mainTypes;

export default Main;
