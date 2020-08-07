import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs';
import {noOperation} from '../../utils';

const tabsList = [`item 1`, `item 2`, `item 3`];

describe(`TabsSnapshot`, () => {
  it(`should render Tabs`, () => {
    const tree = renderer.create(
        <Tabs
          activeItem='item 1'
          items={tabsList}
          onActiveChange={noOperation}
          renderItem={(item, activeItem, onActiveChange) => {
            return (
              <span
                className={`tabs__item${activeItem === item ? ` tabs__item--active` : ``}`}
                onClick={onActiveChange}
              >
                {item}
              </span>
            );
          }}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
