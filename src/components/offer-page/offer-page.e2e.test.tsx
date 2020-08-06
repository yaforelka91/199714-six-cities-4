import * as React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {OfferPage} from './offer-page';
import NameSpace from '../../reducer/name-space';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Router} from 'react-router-dom';
import history from '../../history';
import {AppRoute} from '../../types';
import Offer from '../../interfaces/offer';
import {noOperation} from '../../utils';
import Review from '../../interfaces/review';

const mockStore = configureStore([]);

const offer: Offer = {
  city: {
    name: `city`,
    coords: [0, 0],
    zoom: 1,
  },
  id: 1,
  coords: [52.3909553943508, 4.85309666406198],
  offerZoom: 12,
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
};

const offersList: Offer[] = [
  {
    city: {
      name: `city`,
      coords: [0, 0],
      zoom: 1,
    },
    id: 2,
    coords: [1, 2],
    offerZoom: 12,
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
    offerZoom: 12,
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
];

const reviews: Review[] = [
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
];

describe(`OfferPageE2E`, () => {

  it(`Should update active offer`, () => {
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

    type ProxyProps = {
      hotelObject: Offer;
    }

    const ProxyOfferPage: React.FC<ProxyProps> = (props: ProxyProps) => {
      const {hotelObject} = props;

      return (
        <Provider store={store}>
          <Router history={history}>
            <OfferPage
              authorizationStatus={AuthorizationStatus.AUTH}
              offer={hotelObject}
              offersList={offersList}
              onFavoriteButtonClick={noOperation}
              onReviewsRequest={onReviewsRequest}
              onNearbyRequest={onNearbyRequest}
            />
          </Router>
        </Provider>
      );
    };

    const wrapper = mount(
        <ProxyOfferPage hotelObject={offer} />
    );

    wrapper.children().children().instance().componentDidMount();
    expect(onReviewsRequest.mock.calls[0][0]).toBe(1);
    expect(onNearbyRequest.mock.calls[0][0]).toBe(1);

    wrapper.setProps({hotelObject: offersList[0]});
    expect(onReviewsRequest.mock.calls[1][0]).toBe(2);
    expect(onNearbyRequest.mock.calls[1][0]).toBe(2);
  });

  it(`Should add offer to favorite`, () => {
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
              authorizationStatus={AuthorizationStatus.AUTH}
              offer={offer}
              offersList={offersList}
              onFavoriteButtonClick={onFavoriteButtonClick}
              onReviewsRequest={() => reviews}
              onNearbyRequest={() => offersList}
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
              onReviewsRequest={() => reviews}
              onNearbyRequest={() => offersList}
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
