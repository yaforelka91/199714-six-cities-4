import * as React from 'react';
import {Subtract} from 'utility-types';
import {SortType} from '../../const';
import Sorting from '../../components/sorting/sorting';
import withOpenMenu from '../with-open-menu/with-open-menu';
import {getSortedOffers} from '../../utils';

type State = {
  activeSorting: SortType;
  sortedOffers: {price: number; rating: number}[];
}

type Props = {
  offers: {price: number; rating: number}[];
}

type InjectingProps = {
  renderSorting: () => React.ReactNode;
  offers: {price: number; rating: number}[];
}

const SortingWrapped = withOpenMenu(Sorting);
const withSorting = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithSorting extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeSorting: SortType.POPULAR,
        sortedOffers: props.offers,
      };

      this._handleSortItemClick = this._handleSortItemClick.bind(this);
    }

    _handleSortItemClick(sortType: SortType) {
      this.setState({
        activeSorting: sortType,
        sortedOffers: getSortedOffers({sortType, offers: this.props.offers}),
      });
    }

    componentDidUpdate(prevProps) {
      if (prevProps.offers !== this.props.offers) {
        this.setState({
          sortedOffers: getSortedOffers({sortType: this.state.activeSorting, offers: this.props.offers}),
        });
      }
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
