import React from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import {offerListTypes} from '../../types/types.js';
import {getArticleClassName} from '../../utils.js';

const OfferList = ({
  offers,
  className,
  viewMode,
  onOfferTitleClick,
  onOfferCardEnter
}) => {
  return (
    <div className={`${className ? `${className}` : ``}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          className={getArticleClassName(viewMode).classNameForArticle}
          classNameForImage={getArticleClassName(viewMode).classNameForImage}
          classNameForInfo={getArticleClassName(viewMode).classNameForInfo}
          onOfferTitleClick={onOfferTitleClick}
          onOfferCardEnter={onOfferCardEnter}
        />
      ))}
    </div>
  );
};

OfferList.defaultProps = {
  onOfferCardEnter: () => {},
  className: ``,
};

OfferList.propTypes = offerListTypes;

export default OfferList;
