import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import {getActiveOffer} from '../../reducer/catalog/selectors.js';
import {Router, Switch, Route} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import Login from '../login/login.jsx';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';
import {getOffers} from '../../reducer/data/selectors.js';

const App = ({onOfferTitleClick, login, authorizationStatus, userData, activeCard, offers}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          {
            activeCard ?
              <Page authorizationStatus={authorizationStatus} userData={userData}>
                <OfferPage
                  offer={activeCard}
                  onOfferTitleClick={onOfferTitleClick}
                />
              </Page> :
              <Page className='page--gray page--main' authorizationStatus={authorizationStatus} userData={userData}>
                <Main
                  onOfferTitleClick={onOfferTitleClick}
                />
              </Page>
          }
        </Route>
        <Route exact path={`${AppRoute.OFFER}`} render={(props) => {
          return (
            <Page authorizationStatus={authorizationStatus} userData={userData}>
              <OfferPage
                offer={offers.find((offer) => offer.id === +props.match.params.id)}
                onOfferTitleClick={onOfferTitleClick}
              />
            </Page>
          );
        }}
        />
        <Route exact path={AppRoute.LOGIN}>
          <Page className='page--gray page--login' authorizationStatus={authorizationStatus} userData={userData}>
            <Login
              activeCity={`Amsterdam`}
              onFormSubmit={login}
            />
          </Page>
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  activeCard: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferTitleClick(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
