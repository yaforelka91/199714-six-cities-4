import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {cityShape} from '../../types/types';

const withActiveCity = (Component) => {
  class WithActiveCity extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCity: this.props.offersList[0].city,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange(item) {
      this.setState({
        activeCity: item,
      });
    }

    render() {
      const {activeCity} = this.state;
      const filteredOffers = this.props.offersList.filter((offer) => {
        return offer.city.name === activeCity.name;
      });

      return (
        <Component
          {...this.props}
          offersList={filteredOffers}
          activeCity={activeCity}
          onCityNameClick={this._handleActiveChange}
        />
      );
    }
  }

  WithActiveCity.propTypes = {
    offersList: PropTypes.arrayOf(PropTypes.shape({
      city: cityShape.isRequired,
    })).isRequired,
  };

  return WithActiveCity;
};

export default withActiveCity;
