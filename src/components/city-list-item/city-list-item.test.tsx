import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CityListItem from './city-list-item';
import {Router} from 'react-router-dom';
import history from '../../history';

const city = `city 1`;

describe(`CityListItemSnapshot`, () => {
  it(`should render CityListItem`, () => {
    const tree = renderer.create(
        <Router history={history}>
          <CityListItem
            city={city}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
