import React from 'react';
import {shallow} from 'enzyme';
import withOpenMenu from './with-open-menu.js';

const MockComponent = () => <div />;
const MockComponentWrapped = withOpenMenu(MockComponent);

describe(`withOpenMenuE2E`, ()=>{
  it(`Should open menu`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          activeSorting='option 1'
          onSortItemClick={() => {}}
        />
    );

    expect(wrapper.props().isOpen).toEqual(false);

    wrapper.props().onToggleMenu();
    expect(wrapper.props().isOpen).toEqual(true);

    wrapper.props().onToggleMenu();
    expect(wrapper.props().isOpen).toEqual(false);

    wrapper.props().onSelectMenu();
    expect(wrapper.props().isOpen).toEqual(false);
  });
});
