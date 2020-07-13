import React from 'react';
import {connect} from 'react-redux';
import {SortType} from '../../const.js';
import {sortingTypes} from '../../types/types.js';
import {getSorting} from '../../reducer/catalog/selectors.js';
import {ActionCreator} from '../../reducer/catalog/catalog.js';

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

const Sorting = ({activeSorting, isOpen, onSortItemClick, onToggleMenu, onSelectMenu}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      {`\u00A0`}
      <span className="places__sorting-type" tabIndex="0" onClick={onToggleMenu}>
        {sortItems.find((item) => item.type === activeSorting).text}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}>
        {
          sortItems.map((item)=>(
            <li
              key={item.type}
              className={`places__option ${item.type === activeSorting ? `places__option--active` : ``}`}
              tabIndex="0"
              onClick={() => {
                onSortItemClick(item.type);
                onSelectMenu();
              }}
            >
              {item.text}
            </li>
          ))
        }
      </ul>
      <select
        className="places__sorting-type"
        id="places-sorting"
        value={activeSorting}
        onChange={(evt) => {
          onSortItemClick(evt.target.value);
        }}
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
};

Sorting.propTypes = sortingTypes;

const mapStateToProps = (state) => ({
  activeSorting: getSorting(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortItemClick(sortType) {
    dispatch(ActionCreator.changeSort(sortType));
  },
});

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
