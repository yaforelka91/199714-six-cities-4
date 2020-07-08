import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {sortOffers} from '../../utils.js';

const withSortedItems = (Component) => {
  class WithSortedItems extends PureComponent {
    render() {
      const sortedOffers = sortOffers(this.props.activeSorting, this.props.offers);

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
