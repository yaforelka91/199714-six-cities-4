import React, {PureComponent} from 'react';
import {Subtract} from 'utility-types';
import {SortType} from '../../types';
import Sorting from '../../components/sorting/sorting';
import withOpenMenu from '../with-open-menu/with-open-menu';
import {getSortedOffers} from '../../utils';
import Offer from '../../interfaces/offer';

type Props = {
  offers: {price: number; rating: number}[] | Offer[];
}

type State = {
  activeSorting: SortType;
  sortedOffers: {price: number; rating: number}[] | Offer[];
}

type InjectingProps = {
  renderSorting: () => React.ReactNode;
  offers: {price: number; rating: number}[] | Offer[];
}

const SortingWrapped = withOpenMenu(Sorting);
const withSorting = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithSorting extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeSorting: SortType.POPULAR,
        sortedOffers: props.offers,
      };

      this._handleSortItemClick = this._handleSortItemClick.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.offers !== this.props.offers) {
        this.setState({
          sortedOffers: getSortedOffers({sortType: this.state.activeSorting, offers: this.props.offers}),
        });
      }
    }

    _handleSortItemClick(sortType: SortType) {
      this.setState({
        activeSorting: sortType,
        sortedOffers: getSortedOffers({sortType, offers: this.props.offers}),
      });
    }

    render() {
      const {activeSorting, sortedOffers} = this.state;

      return (
        <Component
          {...this.props}
          offers={sortedOffers}
          renderSorting={() => {
            return (
              <SortingWrapped
                activeSorting={activeSorting}
                onSortItemClick={this._handleSortItemClick}
              />
            );
          }}
        />
      );
    }
  }

  return WithSorting;
};

export default withSorting;