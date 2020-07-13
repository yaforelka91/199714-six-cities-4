import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/data/data.js';
import {getAllOffers, getCity} from '../../reducer/data/selectors';
import {cityShape, offerShape} from '../../types/types';

const withActiveCity = (Component) => {
  class WithActiveCity extends PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
      const {activeCity, allOffers, onCityNameClick} = this.props;
      const citiesList = [...new Set(allOffers.map((offer) => offer.city).map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s));

      return (
        <Component
          {...this.props}
          activeCity={activeCity}
          citiesList={citiesList}
          onCityNameClick={onCityNameClick}
        />
      );
    }
  }

  WithActiveCity.propTypes = {
    allOffers: PropTypes.arrayOf(offerShape).isRequired,
    activeCity: cityShape.isRequired,
    onCityNameClick: PropTypes.func.isRequired,
  };


  const mapStateToProps = (state) => ({
    activeCity: getCity(state),
    allOffers: getAllOffers(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    onCityNameClick(city) {
      dispatch(ActionCreator.changeCity({
        name: city.name,
        location: {
          latitude: city.coords[0],
          longitude: city.coords[1],
          zoom: city.zoom,
        }
      }));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveCity);
};

export default withActiveCity;
