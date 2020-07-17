import React from 'react';
import {shallow} from 'enzyme';
import withActiveCity from './with-active-city.js';

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveCity(MockComponent);

const offersList = [
  {
    city: {
      name: `city 1`,
      coords: [0, 0],
      zoom: 1,
    }
  },
  {
    city: {
      name: `city 2`,
      coords: [0, 0],
      zoom: 1,
    }
  },
  {
    city: {
      name: `city 3`,
      coords: [0, 0],
      zoom: 1,
    }
  }
];

describe(`withActiveCityE2E`, () => {
  it(`Should change active city by a given value`, () => {
    const wrapper = shallow(
        <MockComponentWrapped
          offersList={offersList}
          onCityNameClick={() => {}}
        />
    );

    wrapper.props().onCityNameClick(offersList[2].city);
    expect(wrapper.props().activeCity).toMatchObject({
      name: `city 3`,
      coords: [0, 0],
      zoom: 1,
    });
  });
});
