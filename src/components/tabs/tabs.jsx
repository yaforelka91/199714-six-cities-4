import React, {Fragment} from 'react';
import {tabsTypes} from '../../types/types';

const Tabs = ({activeItem, items, onActiveChange, classNameForList, renderItem}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className={`${classNameForList ? `${classNameForList} ` : ``}tabs__list`}>
          {items.map((item) => {
            return (
              <Fragment key={item}>
                {renderItem(item, activeItem, onActiveChange)}
              </Fragment>
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
