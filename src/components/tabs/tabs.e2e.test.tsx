import * as React from 'react';
import {shallow} from 'enzyme';
import Tabs from './tabs';

const tabsList = [`item 1`, `item 2`, `item 3`];

describe(`TabsE2E`, () => {
  it(`Check has tab's item been pressed`, () => {
    const onActiveChange = jest.fn();

    const tabs = shallow(
        <Tabs
          activeItem='item 1'
          items={tabsList}
          onActiveChange={onActiveChange}
          renderItem={(item, activeItem, callback) => {
            return (
              <span
                className={`tabs__item${activeItem === item ? ` tabs__item--active` : ``}`}
                onClick={callback}
              >
                {item}
              </span>
            );
          }}
        />
    );

    const tabItem = tabs.find(`.tabs__item`).at(1);
    tabItem.simulate(`click`, `item 2`);

    expect(onActiveChange).toHaveBeenCalledTimes(1);
    expect(onActiveChange.mock.calls[0][0]).toBe(`item 2`);
  });
});
