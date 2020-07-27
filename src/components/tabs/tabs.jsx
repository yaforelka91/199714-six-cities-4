import React from 'react';
import {tabsTypes} from '../../types/types';
import CityListItem from '../city-list-item/city-list-item.jsx';

const Tabs = ({activeItem, items, classNameForList, onCityNameClick, onActiveChange}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className={`${classNameForList ? `${classNameForList} ` : ``}tabs__list`}>
          {items.map((item) => {
            return (
              <CityListItem
                key={item}
                city={item}
                onCityNameClick={() => {
                  if (item !== activeItem) {
                    onCityNameClick(item, onActiveChange);
                  }
                }}
                classNameLink={`tabs__item${item === activeItem ? ` tabs__item--active` : ``}`}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

Tabs.defaultProps = {
  classNameForList: ``,
};

Tabs.propTypes = tabsTypes;

export default Tabs;
