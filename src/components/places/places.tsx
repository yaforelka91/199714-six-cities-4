
import React from 'react';
import OfferList from '../offer-list/offer-list';
import {CardView} from '../../types';
import Offer from '../../interfaces/offer';

type Props = {
  offers: Offer[];
  city: string;
  renderSorting: () => React.ReactNode;
  onOfferCardEnter: () => void;
  className?: string;
}

const Places: React.FC<Props> = (props: Props) => {
  const {
    offers,
    city,
    renderSorting,
    onOfferCardEnter,
    className = ``,
  } = props;

  return (
    <section className={`${className ? `${className} ` : ``}places`}>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {city}</b>
      {renderSorting()}
      <OfferList
        offers={offers}
        className='cities__places-list places__list tabs__content'
        viewMode={CardView.CITIES}
        onOfferCardEnter={onOfferCardEnter}
      />
    </section>
  );
};

export default Places;
