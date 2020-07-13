import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/data/data.js';
import {getOffers, getCity, getError} from '../../reducer/data/selectors';
import {cityShape} from '../../types/types';

const withActiveCity = (Component) => {
  class WithActiveCity extends PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
      const {activeCity, onCityNameClick, offers, isError} = this.props;
      const citiesList = [...new Set(offers
        .map((offer) => offer.city)
        .map((o) => JSON.stringify(o))
      )]
        .map((s) => JSON.parse(s));

      return (
        <Component
          {...this.props}
          activeCity={activeCity}
          citiesList={citiesList}
          onCityNameClick={onCityNameClick}
          isError={isError}
        />
      );
    }
  }

  WithActiveCity.defaultProps = {
    isError: false,
  };

  WithActiveCity.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.shape({
      city: cityShape.isRequired,
    })).isRequired,
    activeCity: cityShape.isRequired,
    onCityNameClick: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state) => ({
    activeCity: getCity(state),
    offers: getOffers(state),
    isError: getError(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onCityNameClick(city) {
      dispatch(ActionCreator.changeCity(city));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithActiveCity);
};

export default withActiveCity;
