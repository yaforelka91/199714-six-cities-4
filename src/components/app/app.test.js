import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const offersList = [`Apartment 1`, `Apartment 2`, `Apartmentn 3`];

const offersCount = 200;
describe(`AppSnapshot`, () => {
  it(`should render App`, () => {
    const tree = renderer.create(
        <App
          offersCount={offersCount}
          offersList={offersList}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
