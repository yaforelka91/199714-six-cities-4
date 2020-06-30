import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CityList from './city-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const cities = [
  {
    id: 1,
    name: `city 1`,
    coords: [0, 0],
  },
  {
    id: 2,
    name: `city 2`,
    coords: [0, 0],
  }
];

describe(`CityListE2E`, () => {
  it(`Should city title be pressed`, () => {
    const onCityNameClick = jest.fn();

    const cityList = shallow(
        <CityList
          citiesList={cities}
          activeCity={cities[0]}
          onCityNameClick={onCityNameClick}
        />
    );

    const cityLink = cityList.find(`.locations__item-link`).at(1);
    cityLink.simulate(`click`, {preventDefault() {}}, cities[1].id);

    expect(onCityNameClick).toHaveBeenCalledTimes(1);
    expect(onCityNameClick.mock.calls[0][0]).toBe(2);
  });
});
