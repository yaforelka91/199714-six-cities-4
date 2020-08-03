import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../const';
import Sorting from '../../components/sorting/sorting.jsx';
import withOpenMenu from '../with-open-menu/with-open-menu.js';
import {getSortedOffers} from '../../utils';

const SortingWrapped = withOpenMenu(Sorting);

const withSorting = (Component) => {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeSorting: SortType.POPULAR,
        offers: props.offers,
      };

      this._handleSortItemClick = this._handleSortItemClick.bind(this);
    }

    _handleSortItemClick(sortType) {
      this.setState({
        activeSorting: sortType,
        offers: getSortedOffers({sortType, offers: this.props.offers}),
      });
    }

    componentDidUpdate(prevProps) {
      if (prevProps.offers !== this.props.offers) {
        this.setState({
          offers: getSortedOffers({sortType: this.state.activeSorting, offers: this.props.offers}),
        });
      }
    }

    render() {
      const {activeSorting, offers} = this.state;

      return (
        <Component
          {...this.props}
          offers={offers}
          renderSorting={() =>
            <SortingWrapped
              activeSorting={activeSorting}
              onSortItemClick={this._handleSortItemClick}
            />}
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
