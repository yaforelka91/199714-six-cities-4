import React, {Fragment} from 'react';
import {tabsTypes} from '../../types/types';

const Tabs = ({activeItem, items, onActiveChange, classNameList, renderItem}) => {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className={`${classNameList ? `${classNameList} ` : ``}tabs__list`}>
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
  classNameList: ``,
};

Tabs.propTypes = tabsTypes;

export default Tabs;
