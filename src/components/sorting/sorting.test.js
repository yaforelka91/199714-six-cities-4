import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Sorting} from './sorting.jsx';

const mockStore = configureStore([]);

describe(`SortingSnapshot`, ()=>{
  it(`Should render Sorting`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <Sorting
            activeSorting='popular'
            onSortItemClick={() => {}}
            isOpen={false}
            onToggleMenu={() => {}}
            onSelectMenu={() => {}}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
