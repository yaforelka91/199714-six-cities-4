import React from 'react';
import {mount} from 'enzyme';
import OfferCard from './offer-card';
import {extend, noOperation} from '../../utils';
import {Router} from 'react-router-dom';
import history from '../../history';
import {AuthorizationStatus} from '../../reducer/user/user';
import {AppRoute} from '../../types';
import Offer from '../../interfaces/offer';

const offer: Offer = {
  city: {
    name: `city 1`,
    coords: [0, 0],
    zoom: 1,
  },
  id: 0,
  offerZoom: 12,
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
            onFavoriteButtonClick={noOperation}
          />
        </Router>
    );

    card.simulate(`mouseenter`, offer);

    expect(onOfferCardEnter).toHaveBeenCalledTimes(1);
    expect(onOfferCardEnter.mock.calls[0][0]).toBe(0);
  });

  it(`Check data-format in callback after To favorite button was pressed`, () => {
    const onFavoriteButtonClick = jest.fn();

    const card = mount(
        <Router history={history}>
          <OfferCard
            offer={offer}
            authorizationStatus={AuthorizationStatus.AUTH}
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
      offerZoom: 12,
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

  it(`Should redirect to Login page after To favorite click if user is guest`, () => {
    const onFavoriteButtonClick = jest.fn();

    const card = mount(
        <Router history={history}>
          <OfferCard
            offer={offer}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            onFavoriteButtonClick={onFavoriteButtonClick}
          />
        </Router>
    );

    const button = card.find(`button.place-card__bookmark-button`);
    button.simulate(`click`);

    expect(onFavoriteButtonClick).toHaveBeenCalledTimes(0);
    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });

  it(`Shouldn't rerender again if favorite status didn't change`, () => {
    type ProxyProps = {
      offerObject: Offer;
    }

    const ProxyOfferCard: React.FC<ProxyProps> = (props: ProxyProps) => {
      const {offerObject} = props;

      return (
        <Router history={history}>
          <OfferCard
            offer={offerObject}
            authorizationStatus={AuthorizationStatus.AUTH}
            onFavoriteButtonClick={noOperation}
          />
        </Router>
      );
    };

    const wrapper = mount(
        <ProxyOfferCard offerObject={offer} />
    );

    wrapper.setProps({offer});
    expect(wrapper.find(`OfferCard`).instance().shouldComponentUpdate({offer})).toBe(false);

    wrapper.setProps({offer: extend(offer, {isFavorite: true})});
    expect(wrapper.find(`OfferCard`).instance().shouldComponentUpdate({offer: extend(offer, {isFavorite: true})})).toBe(true);
  });
});
