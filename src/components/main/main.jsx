import React from 'react';
import {mainTypes} from '../../types/types.js';
import Cities from '../cities/cities.jsx';
import Tabs from '../tabs/tabs.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import {connect} from 'react-redux';
import {getCities, getError, getOffers} from '../../reducer/data/selectors.js';
import {getCity} from '../../reducer/catalog/selectors.js';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import CityListItem from '../city-list-item/city-list-item.jsx';
import {Operation as DataOperation} from '../../reducer/data/data.js';

const CitiesWrapped = withActiveItem(Cities);
const TabsWrapped = withActiveItem(Tabs);

const Main = ({
  activeCity,
  offersList,
  onCityNameClick,
  citiesList,
  errorType,
  onOffersRequest
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
      {
        errorType === `` ?
          <CitiesWrapped
            activeCity={activeCity}
            offers={offersList}
            onOffersRequest={onOffersRequest}
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
  },
  onOffersRequest(offerId) {
    dispatch(DataOperation.loadOffers(offerId));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
