import React from 'react';
import {mount} from 'enzyme';
import OfferCard from './offer-card.jsx';
import {extend} from '../../utils.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const offer = {
  city: {
    name: `city 1`,
    coords: [0, 0],
    zoom: 1,
  },
  id: 0,
  coords: [52.3909553943508, 4.85309666406198],
  title: `Beautiful & luxurious apartment at great location`,
  description: [`Text`],
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
  isFavorite: false,
  rating: 4.1,
  bedrooms: 3,
  guests: 4,
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
    id: 1,
    name: `Angelina`,
    picture: `http://placekitten.com/74/74`,
    isSuper: true,
  },
};

describe(`OfferCardE2E`, () => {
  it(`Check offer object in callback in mouseenter event`, () => {
    const onOfferCardEnter = jest.fn();

    const card = mount(
        <Router history={history}>
          <OfferCard
            offer={offer}
            authorizationStatus={AuthorizationStatus.AUTH}
            onOfferCardEnter={onOfferCardEnter}
            onOfferTitleClick={() => {}}
            onFavoriteButtonClick={() => {}}
          />
        </Router>
    );

    card.simulate(`mouseenter`, offer);

    expect(onOfferCardEnter).toHaveBeenCalledTimes(1);
    expect(onOfferCardEnter.mock.calls[0][0]).toBe(0);
  });

  it(`Check data-format in callback after title was pressed`, () => {
    const onOfferTitleClick = jest.fn();

    const card = mount(
        <Router history={history}>
          <OfferCard
            offer={offer}
            authorizationStatus={AuthorizationStatus.AUTH}
            onOfferTitleClick={onOfferTitleClick}
            onFavoriteButtonClick={() => {}}
          />
        </Router>
    );

    const link = card.find(`.place-card__name a`);

    link.simulate(`click`, {preventDefault() {}}, offer.id);

    expect(onOfferTitleClick).toHaveBeenCalledTimes(1);
    expect(onOfferTitleClick.mock.calls[0][0]).toBe(0);
  });

  it(`Check data-format in callback after To favorite button was pressed`, () => {
    const onFavoriteButtonClick = jest.fn();

    const card = mount(
        <Router history={history}>
          <OfferCard
            offer={offer}
            authorizationStatus={AuthorizationStatus.AUTH}
            onOfferTitleClick={() => {}}
            onFavoriteButtonClick={onFavoriteButtonClick}
          />
        </Router>
    );

    const button = card.find(`button.place-card__bookmark-button`);
    button.simulate(`click`, extend(offer, {isFavorite: 1}));

    expect(onFavoriteButtonClick).toHaveBeenCalledTimes(1);
    expect(onFavoriteButtonClick.mock.calls[0][0]).toMatchObject({
      city: {
        name: `city 1`,
        coords: [0, 0],
        zoom: 1,
      },
      id: 0,
      coords: [52.3909553943508, 4.85309666406198],
      title: `Beautiful & luxurious apartment at great location`,
      description: [`Text`],
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
      isFavorite: 1,
      rating: 4.1,
      bedrooms: 3,
      guests: 4,
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
        id: 1,
        name: `Angelina`,
        picture: `http://placekitten.com/74/74`,
        isSuper: true,
      },
    });
  });
});
