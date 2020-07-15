import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../const';
import Sorting from '../../components/sorting/sorting.jsx';
import withOpenMenu from '../with-open-menu/with-open-menu.js';
import {sortOffers} from '../../utils';

const SortingWrapped = withOpenMenu(Sorting);

const withSorting = (Component) => {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeSorting: SortType.POPULAR,
      };

      this._handleSortItemClick = this._handleSortItemClick.bind(this);
    }

    _handleSortItemClick(sortType) {
      this.setState({
        activeSorting: sortType,
      });
    }

    render() {
      const {activeSorting} = this.state;
      const sortedOffers = sortOffers(activeSorting, this.props.offers);
      return (
        <Component
          {...this.props}
          offers={sortedOffers}
          renderSorting={() => {
            return (
              <SortingWrapped
                activeSorting={activeSorting}
                onSortItemClick={this._handleSortItemClick} />
            );
          }}
        />
      );
    }
  }

  WithSorting.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
    })).isRequired,
  };

  return WithSorting;
};

export default withSorting;
