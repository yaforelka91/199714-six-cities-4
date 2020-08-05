import * as React from 'react';
import {shallow} from 'enzyme';
import withActiveItem from './with-active-item';

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

describe(`withActiveItemE2E`, () => {
  it(`Should set new active item by a given value`, () => {
    const wrapper = shallow(
        <MockComponentWrapped/>
    );

    expect(wrapper.props().activeItem).toEqual(-1);

    wrapper.props().onActiveChange(`New item`);
    expect(wrapper.props().activeItem).toEqual(`New item`);
  });

  it(`Should change active item by a given value`, () => {
    const wrapper = shallow(
        <MockComponentWrapped activeItem={5} />
    );

    expect(wrapper.props().activeItem).toEqual(5);

    wrapper.props().onActiveChange(6);
    expect(wrapper.props().activeItem).toEqual(6);
  });
});
