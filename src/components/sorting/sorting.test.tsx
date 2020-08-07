import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting';
import {noOperation} from '../../utils';

describe(`SortingSnapshot`, () => {
  it(`Should render Sorting`, () => {
    const tree = renderer.create(
        <Sorting
          activeSorting='popular'
          onSortItemClick={noOperation}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render open Sorting`, () => {
    const tree = renderer.create(
        <Sorting
          activeSorting='popular'
          onSortItemClick={noOperation}
          isOpen={true}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
