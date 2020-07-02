import React from 'react';
import renderer from 'react-test-renderer';
import {Sorting} from './sorting.jsx';

describe(`SortingSnapshot`, ()=>{
  it(`Should render Sorting`, () => {
    const tree = renderer
      .create(
          <Sorting
            sortList={() => {}}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
