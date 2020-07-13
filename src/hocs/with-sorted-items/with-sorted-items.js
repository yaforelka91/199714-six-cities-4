import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {getSortedOffers} from '../../reducer/catalog/selectors.js';
import {connect} from 'react-redux';
import {offerShape} from '../../types/types.js';

const withSortedItems = (Component) => {
  class WithSortedItems extends PureComponent {
    render() {
      const {offers} = this.props;

      return (
        <Component
          {...this.props}
          offers={offers}
        />
      );
    }
  }

  WithSortedItems.propTypes = {
    offers: PropTypes.arrayOf(offerShape).isRequired
  };

  const mapStateToProps = (state) => ({
    offers: getSortedOffers(state),
  });

  return connect(mapStateToProps)(WithSortedItems);
};

export default withSortedItems;
