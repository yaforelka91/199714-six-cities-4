import React, {PureComponent, createRef} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import {SortType} from '../../const.js';
import {sortingTypes} from '../../types/types.js';

const sortItems = [
  {
    type: SortType.POPULAR,
    text: `Popular`,
  },
  {
    type: SortType.TO_HIGH,
    text: `Price: low to high`,
  },
  {
    type: SortType.TO_LOW,
    text: `Price: high to low`,
  },
  {
    type: SortType.TOP_RATED,
    text: `Top rated first`,
  },
];

class Sorting extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      activeType: SortType.POPULAR,
    };

    this._handleMenuClick = this._handleMenuClick.bind(this);

    this._selectRef = createRef();
  }

  _handleMenuClick() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  _handleSortClick(sortType) {
    this.setState({
      activeType: sortType,
      isOpen: false,
    });

    this.props.sortList(sortType);

    const selectElement = this._selectRef.current;

    if (!selectElement) {
      return;
    }
    const {activeType} = this.state;
    selectElement.value = activeType;
  }

  componentDidUpdate() {
    const selectElement = this._selectRef.current;

    if (!selectElement) {
      return;
    }

    const {activeType} = this.state;
    selectElement.value = activeType;
  }

  render() {
    const {isOpen, activeType} = this.state;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        {`\u00A0`}
        <span className="places__sorting-type" tabIndex="0" onClick={this._handleMenuClick}>
          {sortItems.find((item) => item.type === activeType).text}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}>
          {
            sortItems.map((item)=>(
              <li
                key={item.type}
                className={`places__option ${item.type === activeType ? `places__option--active` : ``}`}
                tabIndex="0"
                onClick={this._handleSortClick.bind(this, item.type)}
              >
                {item.text}
              </li>
            ))
          }
        </ul>
        <select
          className="places__sorting-type"
          id="places-sorting"
          ref={this._selectRef}
          style={{
            clip: `rect(1px, 1px, 1px, 1px)`,
            height: `1px`,
            border: 0,
            overflow: `hidden`,
            position: `absolute`,
            whiteSpace: `nowrap`,
            width: `1px`,
          }}
        >
          {
            sortItems.map((item)=>(
              <option
                key={item.type}
                className="places__option"
                value={item.type}
              >
                {item.text}
              </option>
            ))
          }
        </select>
      </form>
    );
  }
}

Sorting.propTypes = sortingTypes;

const mapDispatchToProps = (dispatch) => ({
  sortList(sortType) {
    dispatch(ActionCreator.sortOffers(sortType));
  },
});

export {Sorting};
export default connect(null, mapDispatchToProps)(Sorting);
