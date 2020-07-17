import React from 'react';
import {shallow} from 'enzyme';
import Sorting from './sorting.jsx';

describe(`Sorting E2E`, () => {
  it(`Sorting option should be pressed`, () => {
    const onSortItemClick = jest.fn();

    const sorting = shallow(
        <Sorting
          activeSorting='popular'
          onSortItemClick={onSortItemClick}
          isOpen={false}
          onToggleMenu={() => {}}
          onSelectMenu={() => {}}
        />
    );

    const options = sorting.find(`li.places__option`);
    options.at(1).simulate(`click`);

    expect(onSortItemClick.mock.calls.length).toBe(1);
    expect(onSortItemClick.mock.calls[0][0]).toBe(`to-high`);
  });

  it(`callback onSelectMenu has been called after select option 1 time`, () => {
    const onSelectMenu = jest.fn();
    const sorting = shallow(
        <Sorting
          activeSorting='popular'
          onSortItemClick={() => {}}
          isOpen={false}
          onToggleMenu={() => {}}
          onSelectMenu={onSelectMenu}
        />
    );

    const options = sorting.find(`li.places__option`);
    options.at(1).simulate(`click`);

    expect(onSelectMenu.mock.calls.length).toBe(1);
  });

  it(`callback onToggleMenu has been called 1 time`, () => {
    const onToggleMenu = jest.fn();
    const sorting = shallow(
        <Sorting
          activeSorting='popular'
          onSortItemClick={() => {}}
          isOpen={false}
          onToggleMenu={onToggleMenu}
          onSelectMenu={() => {}}
        />
    );

    const menuBtn = sorting.find(`span.places__sorting-type`);
    menuBtn.simulate(`click`);

    expect(onToggleMenu.mock.calls.length).toBe(1);
  });

  it(`callback onSortItemClick return option value in select onChange event`, () => {
    const onSortItemClick = jest.fn();
    const mockEvent = {
      target: {
        value: `to-high`,
      },
    };
    const sorting = shallow(
        <Sorting
          activeSorting='popular'
          onSortItemClick={onSortItemClick}
          isOpen={false}
          onToggleMenu={() => {}}
          onSelectMenu={() => {}}
        />
    );

    const select = sorting.find(`select.places__sorting-type`);
    select.simulate(`change`, mockEvent);

    expect(onSortItemClick).toHaveBeenCalledWith(mockEvent.target.value);
  });
});
