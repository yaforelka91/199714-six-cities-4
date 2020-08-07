import React from 'react';

type Props = {
  city?: string;
}

const NoPlaces: React.FC<Props> = (props: Props) => {
  const {city} = props;

  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">
          No places to stay available
        </b>
        <p className="cities__status-description">{`We could not find any property availbale at the moment${city ? ` in ${city}` : ``}`}</p>
      </div>
    </section>
  );
};

export default NoPlaces;
