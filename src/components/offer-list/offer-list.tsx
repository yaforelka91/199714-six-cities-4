import * as React from 'react';
import OfferCard from '../offer-card/offer-card';
import {getArticleClassName} from '../../utils';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {Operation} from '../../reducer/favorites/favorites.js';
import Offer from '../../interfaces/offer';
import {CardView} from '../../const';

type Props = {
  offers: Offer[];
  className: string;
  viewMode: CardView.CITIES | CardView.NEAR | CardView.FAVORITES;
  authorizationStatus: string;
  onOfferCardEnter: () => void;
  onFavoriteButtonClick: () => void;
}

const OfferList: React.FC<Props> = (props: Props) => {
  const {
    offers,
    className = ``,
    viewMode,
    authorizationStatus,
    onOfferCardEnter = () => null,
    onFavoriteButtonClick,
  } = props;

  return (
    <div className={`${className}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          authorizationStatus={authorizationStatus}
          className={getArticleClassName(CardType.viewMode).classNameForArticle}
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

