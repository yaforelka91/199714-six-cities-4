import * as React from 'react';
import Map from '../map/map';
import Places from '../places/places';
import NoPlaces from '../no-places/no-places';
import withSorting from '../../hocs/with-sorting/with-sorting';
import Offer from '../../interfaces/offer';

const PlacesWrapped = withSorting(Places);

type Props = {
  offers: Offer[];
  activeCity: string;
  activeItem: number;
  cityLocation: {
    coords: [number, number];
    zoom: number;
  };
  onActiveChange: () => void;
}

const Cities: React.FC<Props> = (props: Props) => {
  const {
    offers,
    activeCity,
    activeItem,
    cityLocation,
    onActiveChange
  } = props;

  return (
    <div className="cities">
      <div className={`cities__places-container container${offers.length === 0 ? ` cities__places-container--empty` : ``}`}>
        {offers.length > 0 ?
          <PlacesWrapped
            className={`cities__places`}
            offers={offers}
            city={activeCity}
            onOfferCardEnter={onActiveChange}
          /> :
          <NoPlaces city={activeCity} />
        }
        <div className="cities__right-section">
          {offers.length > 0 &&
              <Map
                city={cityLocation.coords}
                zoom={cityLocation.zoom}
                offers={offers.map(({id, coords}) => ({id, coords}))}
                activeCard={activeItem}
                className='cities__map'
              />
          }
        </div>
      </div>
    </div>
  );
};

export default Cities;
