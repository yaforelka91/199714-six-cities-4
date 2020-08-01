import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {OfferPage} from './offer-page.jsx';
import NameSpace from '../../reducer/name-space.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from '../../history.js';
import {AppRoute} from '../../const.js';
import {offerShape} from '../../types/types.js';

const mockStore = configureStore([]);

const mock = {
  offer: {
    city: {
      name: `city`,
      coords: [0, 0],
      zoom: 1,
    },
    id: 1,
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
  },
  offersList: [
    {
      city: {
        name: `city`,
        coords: [0, 0],
        zoom: 1,
      },
      id: 2,
      coords: [1, 2],
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
        id: 3,
        name: `Angelina`,
        picture: `http://placekitten.com/74/74`,
        isSuper: true,
      },
    },
    {
      city: {
        name: `city`,
        coords: [0, 0],
        zoom: 1,
      },
      id: 3,
      coords: [3, 4],
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
        id: 5,
        name: `Angelina`,
        picture: `http://placekitten.com/74/74`,
        isSuper: true,
      },
    },
  ],
  reviews: [
    {
      id: 1,
      rating: 5,
      feedback: `Text`,
      user: {
        id: 1,
        name: `Max`,
        picture: `pic.jpg`,
      },
      visitTime: `2020-07-25`,
    }
  ]
};

describe(`OfferPageE2E`, () => {

  it(`Should update active offer`, () => {
    const {offer, offersList, reviews} = mock;

    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      [NameSpace.REVIEWS]: {
        reviews,
      }
    });

    const onReviewsRequest = jest.fn();
    const onNearbyRequest = jest.fn();
    const onSetActiveOffer = jest.fn();

    const Proxy = ({hotelObject}) => (
      <Provider store={store}>
        <Router history={history}>
          <OfferPage
            offer={hotelObject}
            offersList={offersList}
            onFavoriteButtonClick={() => {}}
            onReviewsRequest={onReviewsRequest}
            onNearbyRequest={onNearbyRequest}
            onSetActiveOffer={onSetActiveOffer}
          />
        </Router>
      </Provider>
    );

    Proxy.propTypes = {
      hotelObject: offerShape.isRequired,
    };

    const wrapper = mount(
        <Proxy hotelObject={offer} />
    );

    wrapper.children().children().instance().componentDidMount();
    expect(onReviewsRequest.mock.calls[0][0]).toBe(1);
    expect(onNearbyRequest.mock.calls[0][0]).toBe(1);
    expect(onSetActiveOffer.mock.calls[0][0]).toBe(1);

    wrapper.setProps({hotelObject: offersList[0]});
    expect(onReviewsRequest.mock.calls[1][0]).toBe(2);
    expect(onNearbyRequest.mock.calls[1][0]).toBe(2);
    expect(onSetActiveOffer.mock.calls[1][0]).toBe(2);
  });

  it(`Should add offer to favorite`, () => {
    const {offer, offersList, reviews} = mock;

    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      [NameSpace.REVIEWS]: {
        reviews,
      }
    });

    const onFavoriteButtonClick = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <OfferPage
              offer={offer}
              offersList={offersList}
              onFavoriteButtonClick={onFavoriteButtonClick}
              onReviewsRequest={() => {
                return reviews;
              }}
              onNearbyRequest={() => {
                return offersList;
              }}
              onSetActiveOffer={() => {
                return offer;
              }}
            />
          </Router>
        </Provider>
    );

    const favoriteButton = wrapper.find(`button.property__bookmark-button.button`);
    favoriteButton.simulate(`click`, offer);
    expect(onFavoriteButtonClick.mock.calls[0][0]).toMatchObject(
        {
          city: {
            name: `city`,
            coords: [0, 0],
            zoom: 1,
          },
          id: 1,
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
        }
    );
  });

  it(`Should redirect to login after favorite was clicked if user is guest`, () => {
    const {offer, offersList, reviews} = mock;

    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      [NameSpace.REVIEWS]: {
        reviews,
      }
    });

    const onFavoriteButtonClick = jest.fn();

    const wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <OfferPage
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              offer={offer}
              offersList={offersList}
              onFavoriteButtonClick={onFavoriteButtonClick}
              onReviewsRequest={() => {
                return reviews;
              }}
              onNearbyRequest={() => {
                return offersList;
              }}
              onSetActiveOffer={() => {
                return offer;
              }}
            />
          </Router>
        </Provider>
    );

    const favoriteButton = wrapper.find(`button.property__bookmark-button.button`);
    favoriteButton.simulate(`click`);

    expect(onFavoriteButtonClick).toHaveBeenCalledTimes(0);
    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });
});
