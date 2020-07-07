import React, {PureComponent} from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import {offerListTypes} from '../../types/types.js';

class OfferList extends PureComponent {
  render() {
    const {
      offers,
      className,
      isNear,
      onOfferTitleClick,
      onOfferCardEnter
    } = this.props;

    return (
      <div className={`places__list ${className}`}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onOfferTitleClick={onOfferTitleClick}
            onOfferCardEnter={onOfferCardEnter}
            isNear={isNear}
          />
        ))}
      </div>
    );
  }
}

OfferList.defaultProps = {
  onOfferCardEnter: () => {},
  className: ``,
};

OfferList.propTypes = offerListTypes;

export default OfferList;
