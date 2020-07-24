import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator as CatalogActionCreator} from '../../reducer/catalog/catalog.js';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data.js';
import {getActiveOffer} from '../../reducer/catalog/selectors.js';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import Login from '../login/login.jsx';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {Operation as ReviewsOperation} from '../../reducer/reviews/reviews.js';

import history from '../../history.js';
import {AppRoute} from '../../const.js';
import {getOffers, getLoadingStatus, getNearestOffers} from '../../reducer/data/selectors.js';
import {OfferCard} from '../offer-card/offer-card.jsx';

class App extends PureComponent {
  componentDidMount() {
    const {onAuthCheck, onOffersLoad} = this.props;
    // onAuthCheck();
    onOffersLoad();
  }

  render() {
    const {authorizationStatus, offers, userData, login} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT} render={() => {
            return (
              <Page className='page--gray page--main' authorizationStatus={authorizationStatus} userData={userData}>
                <Main />
              </Page>
            );
          }}
          />
          <Route exact path={`${AppRoute.OFFER}/:id`} render={(props) => {
            // onOfferTitleClick(+props.match.params.id);
            // onNearbyRequest(+props.match.params.id);
            // onReviewsRequest(+props.match.params.id);

            return (
              <Page authorizationStatus={authorizationStatus} userData={userData}>
                <OfferPage
                  offer={offers.find((offer) => offer.id === +props.match.params.id)}
                />
              </Page>
            );
          }}
          />
          <Route exact path={AppRoute.LOGIN} render={() => {
            if (authorizationStatus !== AuthorizationStatus.AUTH) {
              return (
                <Page className='page--gray page--login' authorizationStatus={authorizationStatus} userData={userData}>
                  <Login
                    onFormSubmit={login}
                  />
                </Page>
              );
            }
            return <Redirect to={AppRoute.ROOT} />;
          }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  activeCard: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
  offers: getOffers(state),
  nearbyList: getNearestOffers(state),
  isLoading: getLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  // onOfferTitleClick(offerId) {
  //   dispatch(DataOperation.loadNearOffers(offerId));
  //   dispatch(ReviewsOperation.loadReviews(offerId));
  // },
  // onNearbyRequest(offerId) {
  //   dispatch(DataOperation.loadNearOffers(offerId));
  // },
  // onReviewsRequest(offerId) {
  //   dispatch(ReviewsOperation.loadReviews(offerId));
  // },
  // login(authData) {
  //   dispatch(UserOperation.login(authData));
  // },
  onAuthCheck() {
    dispatch(UserOperation.checkAuth());
  },
  onOffersLoad() {
    dispatch(DataOperation.loadOffers());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
