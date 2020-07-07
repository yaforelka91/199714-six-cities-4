import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withOpenMenu from './with-open-menu.js';

configure({
  adapter: new Adapter()
});

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
