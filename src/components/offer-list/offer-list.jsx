import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import OfferCard from '../offer-card/offer-card.jsx';
import {offerListTypes} from '../../types/types.js';

const OfferList = ({
  offers,
  className,
  isNear,
  onOfferTitleClick,
  onOfferCardEnter,
  onOfferCardLeave
}) => {
  return (
    <div className={`places__list ${className}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onOfferTitleClick={onOfferTitleClick}
          onOfferCardEnter={onOfferCardEnter}
          onOfferCardLeave={onOfferCardLeave}
          isNear={isNear}
        />
      ))}
    </div>
  );
};

OfferList.defaultProps = {
  onOfferCardEnter: () => {},
  onOfferCardLeave: () => {},
  className: ``,
};

OfferList.propTypes = offerListTypes;

const mapDispatchToProps = (dispatch) => ({
  onOfferCardEnter(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
  },
  onOfferCardLeave() {
    dispatch(ActionCreator.setActiveCard({}));
  }
});

export {OfferList};
export default connect(null, mapDispatchToProps)(OfferList);
