import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting.jsx';

describe(`SortingSnapshot`, () => {
  it(`Should render Sorting`, () => {
    const tree = renderer.create(
        <Sorting
          activeSorting='popular'
          onSortItemClick={() => {}}
          isOpen={false}
          onToggleMenu={() => {}}
          onSelectMenu={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render open Sorting`, () => {
    const tree = renderer.create(
        <Sorting
          activeSorting='popular'
          onSortItemClick={() => {}}
          isOpen={true}
          onToggleMenu={() => {}}
          onSelectMenu={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
