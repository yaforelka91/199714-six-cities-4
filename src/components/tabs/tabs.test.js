import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';
import {Router} from 'react-router-dom';
import history from '../../history.js';

const tabList = [`item 1`, `item 2`, `item 3`];

describe(`TabsSnapshot`, () => {
  it(`should render Tabs`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <Tabs
            activeItem='item 1'
            items={tabList}
            onActiveChange={() => {}}
            onCityNameClick={() => {}}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
