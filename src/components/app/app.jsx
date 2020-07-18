import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import {getActiveOffer} from '../../reducer/catalog/selectors.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage, {OfferPage as DevOfferPage} from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import offersMock from '../../mocks/offers.js';
import Login from '../login/login.jsx';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';

class App extends PureComponent {
  _renderApp() {
    const {
      activeCard,
      authorizationStatus,
      userData,
      onOfferTitleClick,
    } = this.props;

    if (!activeCard) {
      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <Page className='page--gray page--login' authorizationStatus={authorizationStatus} userData={userData}>
            <Login />
          </Page>
        );
      } else {
        return (
          <Page className='page--gray page--main' authorizationStatus={authorizationStatus} userData={userData}>
            <Main
              onOfferTitleClick={onOfferTitleClick}
            />
          </Page>
        );
      }
    }

    if (activeCard) {
      return (
        <Page authorizationStatus={authorizationStatus} userData={userData}>
          <OfferPage
            onOfferTitleClick={onOfferTitleClick}
            authorizationStatus={authorizationStatus}
            userData={userData}
          />
        </Page>
      );
    }

    return null;
  }

  render() {
    const {onOfferTitleClick, login, authorizationStatus, userData} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <DevOfferPage
              offer={offersMock[0]}
              offersList={offersMock}
              onOfferTitleClick={onOfferTitleClick}
            />
          </Route>
          <Route exact path="/dev-login">
            <Page className='page--gray page--login' authorizationStatus={authorizationStatus} userData={userData}>
              <Login
                activeCity={`Amsterdam`}
                onFormSubmit={login}
              />
            </Page>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  activeCard: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
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
