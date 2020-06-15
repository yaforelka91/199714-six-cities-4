import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const offersList = [`Apartment 1`, `Apartment 2`, `Apartmentn 3`];

const offersCount = 200;
describe(`MainSnapshot`, () => {
  it(`should render correctly`, () => {
    const tree = renderer.create(
        <Main
          offersCount={offersCount}
          offersList={offersList}
          onOfferTitleClick={()=>{}}
        />
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
