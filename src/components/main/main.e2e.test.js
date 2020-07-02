import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const offersList = [
  {
    id: 0,
    coords: [52.3909553943508, 4.85309666406198],
    title: `Beautiful & luxurious apartment at great location`,
    description: [
      `A quiet cozy and picturesque that hides behind a 
  river by the unique lightness of Amsterdam.
  The building is green and from 18th century.`,
      `An independent House, strategically located 
  between Rembrand Square and National Opera, 
  but where the bustle of the city comes to rest 
  in this alley flowery and colorful.`
    ],
    picture: `http://placeimg.com/260/200/arch`,
    pictures: [
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`,
      `http://placeimg.com/260/200/arch`
    ],
    price: 120,
    type: `Apartment`,
    isPremium: true,
    rating: 4.1,
    bedrooms: `3 Bedrooms`,
    guests: `Max 4 adults`,
    services: [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
      `Fridge`,
    ],
    host: {
      name: `Angelina`,
      picture: `http://placekitten.com/74/74`,
      isSuper: true,
    },
    reviews: [`0`, `1`],
  },
];

const cities = [
  {
    id: 1,
    name: `city 1`,
    coords: [0, 0],
  },
];

describe(`MainE2E`, () => {
  it(`Should offer title be pressed`, () => {
    const onOfferTitleClick = jest.fn();

    const main = mount(
        <Main
          offersList={offersList}
          onOfferTitleClick={onOfferTitleClick}
          citiesList={cities}
          city={cities[0]}
          onCityNameClick={()=>{}}
        />
    );

    const offerLinks = main.find(`.place-card__name a`);
    offerLinks.forEach((node) => {
      node.simulate(`click`);
    });

    expect(onOfferTitleClick).toHaveBeenCalledTimes(offersList.length);
  });

  it(`Should city name be pressed`, () => {
    const onCityNameClick = jest.fn();

    const main = mount(
        <Main
          offersList={offersList}
          onOfferTitleClick={()=>{}}
          citiesList={cities}
          city={cities[0]}
          onCityNameClick={onCityNameClick}
        />
    );

    const cityLink = main.find(`.locations__item-link`).at(0);
    cityLink.simulate(`click`);

    expect(onCityNameClick).toHaveBeenCalledTimes(1);
  });
});
