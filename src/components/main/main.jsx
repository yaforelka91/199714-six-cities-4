import React from 'react';
import OfferList from '../offer-list/offer-list.jsx';
import CityList from '../city-list/city-list.jsx';
import Map from '../map/map.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card.js';
import {mainTypes} from '../../types/types.js';
import Sorting from '../sorting/sorting.jsx';

const OfferListWrapped = withActiveCard(OfferList);
const Main = ({
  offersList,
  citiesList,
  city,
  onCityNameClick,
  onOfferTitleClick
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
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersList.length} places to stay in {city.name}</b>
              <Sorting />
              <OfferListWrapped
                offers={offersList}
                onOfferTitleClick={onOfferTitleClick}
                className='cities__places-list tabs__content'
                isNear={false}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offersList} activeCity={city.coords} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = mainTypes;

export default Main;
