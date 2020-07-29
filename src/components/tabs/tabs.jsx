import React, {Fragment, Component} from 'react';
import {tabsTypes} from '../../types/types';

class Tabs extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.activeItem !== this.props.activeItem;
  }

  render() {
    const {activeItem, items, onActiveChange, classNameForList, renderItem} = this.props;

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
  }
}

Tabs.defaultProps = {
  classNameForList: ``,
};

Tabs.propTypes = tabsTypes;

export default Tabs;
