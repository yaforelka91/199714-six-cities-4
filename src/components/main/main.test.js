import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const offersList = [
  {
    id: 1,
    coords: [52.3909553943508, 4.85309666406198],
    title: `Offer 1`,
    picture: `pic1`,
    price: 120,
    type: `Apartment`,
    isPremium: true,
    rating: 4.1,
  },
  {
    id: 2,
    coords: [52.369553943508, 4.85309666406198],
    title: `Offer 2`,
    picture: `pic2`,
    price: 80,
    type: `Private room`,
    isPremium: false,
    rating: 4.2,
  }
];
describe(`MainSnapshot`, () => {
  it(`should render correctly`, () => {
    const tree = renderer.create(
        <Main
          offersList={offersList}
          onOfferTitleClick={()=>{}}
        />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
