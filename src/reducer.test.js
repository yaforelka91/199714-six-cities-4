import {reducer, ActionCreator, ActionType} from './reducer.js';
import {CityList, SortType} from './const.js';

const offersList = [
  {
    city: {
      id: 4,
      name: CityList.AMSTERDAM,
      coords: [52.373057, 4.892557],
    },
    offers: [
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
      {
        id: 1,
        coords: [52.369553943508, 4.85309666406198],
        title: `Wood and stone place`,
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
        price: 80,
        type: `Private room`,
        isPremium: false,
        rating: 4.2,
        bedrooms: `1 Bedroom`,
        guests: `Max 4 adults`,
        services: [
          `Wi-Fi`,
          `Towels`,
          `Heating`,
          `Coffee machine`,
          `Cabel TV`,
          `Fridge`,
        ],
        host: {
          name: `Robin`,
          picture: `http://placekitten.com/74/74`,
          isSuper: false,
        },
        reviews: [`2`],
      },
      {
        id: 2,
        coords: [52.3909553943508, 4.929309666406198],
        title: `Canal View Prinsengracht`,
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
        price: 132,
        type: `Apartment`,
        isPremium: false,
        rating: 4.3,
        bedrooms: `3 Bedroom`,
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
          name: `Anna`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
      {
        id: 3,
        coords: [52.3809553943508, 4.939309666406198],
        title: `Nice, cozy, warm big bed apartment`,
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
        price: 180,
        type: `Apartment`,
        isPremium: true,
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`4`],
      }
    ]
  },
  {
    city: {
      id: 1,
      name: CityList.PARIS,
      coords: [48.856663, 2.351556],
    },
    offers: [
      {
        id: 4,
        coords: [48.858126, 2.330508],
        title: `Apartment in Paris`,
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
        price: 180,
        type: `Apartment`,
        isPremium: true,
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
    ]
  },
  {
    city: {
      id: 2,
      name: CityList.COLOGNE,
      coords: [50.930779, 6.938399],
    },
    offers: [
      {
        id: 5,
        coords: [50.936311, 6.958560],
        title: `Apartment in Cologne`,
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
        price: 180,
        type: `Apartment`,
        isPremium: true,
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
    ]
  },
  {
    city: {
      id: 3,
      name: CityList.BRUSSELS,
      coords: [50.851309, 4.351718],
    },
    offers: [
      {
        id: 6,
        coords: [50.847037, 4.352494],
        title: `Apartment in Brussels`,
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
        price: 180,
        type: `Apartment`,
        isPremium: true,
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
    ]
  },
  {
    city: {
      id: 5,
      name: CityList.HAMBURG,
      coords: [53.552645, 9.966287],
    },
    offers: [
      {
        id: 7,
        coords: [53.553542, 9.912283],
        title: `Apartment in Hamburg`,
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
        price: 180,
        type: `Apartment`,
        isPremium: true,
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
    ]
  },
  {
    city: {
      id: 6,
      name: CityList.DUSSELDORF,
      coords: [51.230569, 6.787428],
    },
    offers: [
      {
        id: 8,
        coords: [51.202025, 6.800942],
        title: `Apartment in Dusseldorf`,
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
        price: 180,
        type: `Apartment`,
        isPremium: true,
        rating: 4.9,
        bedrooms: `4 Bedroom`,
        guests: `Max 6 adults`,
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
          name: `Bob`,
          picture: `http://placekitten.com/74/74`,
          isSuper: true,
        },
        reviews: [`3`],
      },
    ]
  }
];
describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initialState`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: offersList[0].city,
      offersList,
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    });
  });

  it(`Reducer should change current city by a given value`, () => {
    expect(reducer({
      city: offersList[0].city,
      offersList,
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: {
        id: 1,
        name: CityList.PARIS,
        coords: [48.856663, 2.351556],
      },
    })).toEqual({
      city: {
        id: 1,
        name: CityList.PARIS,
        coords: [48.856663, 2.351556],
      },
      offersList,
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    });
  });

  it(`Reducer should get offers`, () => {
    expect(reducer({
      city: offersList[0].city,
      offersList,
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    }, {
      type: ActionType.GET_OFFERS,
    })).toEqual({
      city: offersList[0].city,
      offersList,
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    });
  });

  it(`Reducer should change active sorting by a given value`, () => {
    expect(reducer({
      city: {},
      offersList,
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    }, {
      type: ActionType.CHANGE_SORT,
      payload: SortType.TO_LOW,
    })).toEqual({
      city: {},
      offersList,
      activeCard: -1,
      activeSorting: SortType.TO_LOW,
    });
  });

  it(`Reducer should change active offer by a given value`, () => {
    expect(reducer({
      city: {},
      offersList: [],
      activeCard: -1,
      activeSorting: SortType.POPULAR,
    }, {
      type: ActionType.SET_ACTIVE_CARD,
      payload: 1,
    })).toEqual({
      city: {},
      offersList: [],
      activeCard: 1,
      activeSorting: SortType.POPULAR,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing city returns action with 1 payload`, () => {
    expect(ActionCreator.changeCity(1)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 1,
    });
  });

  it(`Action creator for getting offers returns action that get offers`, () => {
    expect(ActionCreator.getOffers()).toEqual({
      type: ActionType.GET_OFFERS,
    });
  });

  it(`Action creator for sorting offers returns action with POPULAR payload`, ()=> {
    expect(ActionCreator.changeSort(SortType.POPULAR)).toEqual({
      type: ActionType.CHANGE_SORT,
      payload: SortType.POPULAR,
    });
  });

  it(`Action creator for setting active card returns action with offer payload`, ()=> {
    expect(ActionCreator.setActiveCard(1)).toEqual({
      type: ActionType.SET_ACTIVE_CARD,
      payload: 1,
    });
  });
});
