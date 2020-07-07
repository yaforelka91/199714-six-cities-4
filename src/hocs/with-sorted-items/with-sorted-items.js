import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {sortOffers} from '../../utils.js';

const withSortedItems = (Component) => {
  class WithSortedItems extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeSorting: props.activeSorting,
      };
    }

    componentDidUpdate() {
      this.setState({
        activeSorting: this.props.activeSorting
      });
    }

    render() {
      const sortedOffers = sortOffers(this.state.activeSorting, this.props.offers);

      return (
        <Component
          {...this.props}
          offers={sortedOffers}
        />
      );
    }
  }

  WithSortedItems.propTypes = {
    activeSorting: PropTypes.string.isRequired,
    offers: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  };

  return WithSortedItems;
};

export default withSortedItems;
