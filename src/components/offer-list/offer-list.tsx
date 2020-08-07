import React from 'react';
import OfferCard from '../offer-card/offer-card';
import {getArticleClassName, noOperation} from '../../utils';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/favorites/favorites';
import Offer from '../../interfaces/offer';
import {CardView} from '../../types';

type Props = {
  offers: Offer[];
  className?: string;
  viewMode: CardView;
  authorizationStatus: string;
  onOfferCardEnter?: () => void;
  onFavoriteButtonClick: () => void;
}

const OfferList: React.FC<Props> = (props: Props) => {
  const {
    offers,
    className = ``,
    viewMode,
    authorizationStatus,
    onOfferCardEnter = noOperation,
    onFavoriteButtonClick,
  } = props;

  return (
    <div className={`${className}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          authorizationStatus={authorizationStatus}
          className={getArticleClassName(viewMode).classNameForArticle}
          classNameForImage={getArticleClassName(viewMode).classNameForImage}
          classNameForInfo={getArticleClassName(viewMode).classNameForInfo}
          onOfferCardEnter={onOfferCardEnter}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(hotel) {
    dispatch(Operation.changeFavoriteStatus(hotel));
  },
});

export {OfferList};
export default connect(mapStateToProps, mapDispatchToProps)(OfferList);

