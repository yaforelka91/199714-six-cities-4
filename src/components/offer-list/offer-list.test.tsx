import React from 'react';
import renderer from 'react-test-renderer';
import {OfferList} from './offer-list';
import {AuthorizationStatus} from '../../reducer/user/user';
import {CardView} from '../../types';
import {Router} from 'react-router-dom';
import history from '../../history';
import {noOperation} from '../../utils';
import Offer from '../../interfaces/offer';

const offers: Offer[] = [
  {
    city: {
      name: `city`,
      coords: [0, 0],
      zoom: 1,
    },
    id: 0,
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
  },
];

describe(`OfferListSnapshot`, () => {
  it(`should render OfferList`, () => {

    const tree = renderer.create(
        <Router history={history}>
          <OfferList
            offers={offers}
            viewMode={CardView.CITIES}
            authorizationStatus={AuthorizationStatus.AUTH}
            onFavoriteButtonClick={noOperation}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});