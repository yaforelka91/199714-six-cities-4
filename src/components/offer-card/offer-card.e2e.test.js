import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OfferCard from './offer-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const offer = {
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
};

describe(`OfferCardE2E`, () => {
  it(`Check offer object in callback in mouseenter event`, () => {
    const onOfferCardEnter = jest.fn();

    const card = shallow(
        <OfferCard
          offer={offer}
          onOfferCardEnter={onOfferCardEnter}
          onOfferCardLeave={()=>{}}
          isNear={false}
          onOfferTitleClick={()=>{}}
        />
    );

    card.simulate(`mouseenter`, offer);

    expect(onOfferCardEnter).toHaveBeenCalledTimes(1);
    expect(onOfferCardEnter.mock.calls[0][0]).toMatchObject(offer);
  });

  it(`Check data-format in callback after title was pressed`, () => {
    const onOfferTitleClick = jest.fn();

    const card = shallow(
        <OfferCard
          offer={offer}
          isNear={false}
          onOfferCardEnter={()=>{}}
          onOfferCardLeave={()=>{}}
          onOfferTitleClick={onOfferTitleClick}
        />
    );

    const link = card.find(`.place-card__name a`);

    link.simulate(`click`, {preventDefault() {}}, offer);

    expect(onOfferTitleClick).toHaveBeenCalledTimes(1);
    expect(onOfferTitleClick.mock.calls[0][0]).toMatchObject(offer);
  });

  it(`Check offer object in callback in mouseleave event`, () => {
    const onOfferCardLeave = jest.fn();

    const card = shallow(
        <OfferCard
          offer={offer}
          onOfferCardEnter={()=>{}}
          onOfferCardLeave={onOfferCardLeave}
          isNear={false}
          onOfferTitleClick={()=>{}}
        />
    );

    card.simulate(`mouseleave`);
    expect(onOfferCardLeave).toHaveBeenCalledTimes(1);
  });
});
