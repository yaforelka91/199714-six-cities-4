import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {cityShape} from '../../types/types';
import {getFilteredOffers} from '../../utils';

const withActiveCity = (Component) => {
  class WithActiveCity extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCity: this.props.offersList[0].city,
        offers: getFilteredOffers({
          activeCity: this.props.offersList[0].city,
          offers: this.props.offersList,
        }),
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange(activeCity) {
      this.setState({
        activeCity,
        offers: getFilteredOffers({activeCity, offers: this.props.offersList}),
      });
    }

    render() {
      const {activeCity, offers} = this.state;

      return (
        <Component
          {...this.props}
          offersList={offers}
          activeCity={activeCity}
          onCityNameClick={this._handleActiveChange}
        />
      );
    }
  }

  WithActiveCity.defaultProps = {
    offersList: [
      {
        city: {
          name: `Paris`,
          coords: [0, 0],
          zoom: 1,
        }
      }
    ]
  };

  WithActiveCity.propTypes = {
    offersList: PropTypes.arrayOf(PropTypes.shape({
      city: cityShape.isRequired,
    })).isRequired,
  };

  return WithActiveCity;
};

export default withActiveCity;
