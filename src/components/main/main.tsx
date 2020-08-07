import React from 'react';
import Cities from '../cities/cities';
import Tabs from '../tabs/tabs';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {connect} from 'react-redux';
import {getCities} from '../../reducer/data/selectors';
import {getCity, getFilteredOffers, getCityLocation} from '../../reducer/catalog/selectors';
import {ActionCreator} from '../../reducer/catalog/catalog';
import CityListItem from '../city-list-item/city-list-item';
import Offer from '../../interfaces/offer';
const CitiesWrapped = withActiveItem(Cities);
const TabsWrapped = withActiveItem(Tabs);

type Props = {
  offersList: Offer[];
  activeCity: string;
  citiesList: Array<string>;
  cityLocation: {
    coords: [number, number];
    zoom: number;
  };
  onCityNameClick: (item: string, onActiveChange: () => void) => void;
}

const Main: React.FC<Props> = (props: Props) => {
  const {
    activeCity,
    offersList,
    onCityNameClick,
    citiesList,
    cityLocation,
  } = props;

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
              onCityNameClick={() => onCityNameClick(item, onActiveChange)}
            />
          );
        }}
      />
      <CitiesWrapped
        activeCity={activeCity}
        offers={offersList}
        cityLocation={cityLocation}
      />
    </main>
  );
};

const mapStateToProps = (state) => ({
  activeCity: getCity(state),
  offersList: getFilteredOffers(state),
  citiesList: getCities(state),
  cityLocation: getCityLocation(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick(city, onActiveChange) {
    onActiveChange(city);
    dispatch(ActionCreator.changeCity(city));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
