import React from 'react';
import {mainTypes} from '../../types/types.js';
import Cities from '../cities/cities.jsx';
import Tabs from '../tabs/tabs.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import {connect} from 'react-redux';
import {getCities} from '../../reducer/data/selectors.js';
import {getCity, getFilteredOffers} from '../../reducer/catalog/selectors.js';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import CityListItem from '../city-list-item/city-list-item.jsx';

const CitiesWrapped = withActiveItem(Cities);
const TabsWrapped = withActiveItem(Tabs);

const Main = ({
  activeCity,
  offersList,
  onCityNameClick,
  citiesList,
}) => {
  return (
    <main className={`page__main page__main--index${offersList.length === 0 ? ` page__main--index-empty` : ``}`}>
      <h1 className="visually-hidden">Cities</h1>
      <TabsWrapped
        items={citiesList}
        classNameForList='locations__list'
        activeItem={activeCity}
        renderItem={(item, activeItem, onActiveChange) => {
          return (
            <CityListItem
              city={item}
              classNameLink={`tabs__item${activeItem === item ? ` tabs__item--active` : ``}`}
              onCityNameClick={() => {
                onCityNameClick(item, onActiveChange);
              }}
            />
          );
        }}
      />
      <CitiesWrapped
        activeCity={activeCity}
        offers={offersList}
      />
    </main>
  );
};

Main.propTypes = mainTypes;

const mapStateToProps = (state) => ({
  activeCity: getCity(state),
  offersList: getFilteredOffers(state),
  citiesList: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick(city, onActiveChange) {
    onActiveChange(city);
    dispatch(ActionCreator.changeCity(city));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
