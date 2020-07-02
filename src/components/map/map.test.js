import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Map} from './map.jsx';

const mockStore = configureStore([]);

const offers = [
  {
    id: 1,
    coords: [52.3909553943508, 4.85309666406198],
  }
];

const activeCity = [52.3909553943508, 4.85309666406198];

describe(`MapSnapshot`, () => {
  it(`should render Map`, () => {
    const store = mockStore({});

    const tree = renderer.create(
        <Provider store={store}>
          <Map
            activeCard={{}}
            offers={offers}
            activeCity={activeCity}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
