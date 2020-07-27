import React from 'react';
import {mainTypes} from '../../types/types.js';
import Cities from '../cities/cities.jsx';
import Tabs from '../tabs/tabs.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import {connect} from 'react-redux';
import {getCities, getError, getOffers} from '../../reducer/data/selectors.js';
import {getCity} from '../../reducer/catalog/selectors.js';
import {ActionCreator} from '../../reducer/catalog/catalog.js';

const CitiesWrapped = withActiveItem(Cities);
const TabsWrapped = withActiveItem(Tabs);

const Main = ({
  activeCity,
  offersList,
  onCityNameClick,
  citiesList,
  errorType
}) => {

  return (
    <main className={`page__main page__main--index${offersList.length === 0 ? ` page__main--index-empty` : ``}`}>
      <h1 className="visually-hidden">Cities</h1>
      <TabsWrapped
        items={citiesList}
        classNameForList='locations__list'
        activeItem={activeCity}
        onCityNameClick={onCityNameClick}
      />
      {
        errorType === `` ?
          <CitiesWrapped
            activeCity={activeCity}
            offers={offersList}
          />
          :
          <p style={{fontSize: 32, textAlign: `center`}}>
            <b>Sorry, something went wrong :( Please, come back later</b>
          </p>
      }
    </main>
  );
};


Main.defaultProps = {
  errorType: ``,
};

Main.propTypes = mainTypes;

const mapStateToProps = (state) => ({
  activeCity: getCity(state),
  offersList: getOffers(state).filter((offer) => offer.city.name === getCity(state)),
  citiesList: getCities(state),
  errorType: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick(city, onActiveChange) {
    onActiveChange(city);
    dispatch(ActionCreator.changeCity(city));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
