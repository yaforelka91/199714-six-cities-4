import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import {getActiveCard, getFilteredOffers} from '../../reducer/catalog/selectors.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import offersMock from '../../mocks/offers.js';

class App extends PureComponent {
  _renderApp() {
    const {
      activeCard,
      offersList,
      onOfferTitleClick
    } = this.props;

    if (activeCard < 0) {
      return (
        <Page className='page--gray page--main'>
          <Main
            offersList={offersList}
            onOfferTitleClick={onOfferTitleClick}
          />
        </Page>
      );
    }

    if (activeCard >= 0) {
      return (
        <Page>
          <OfferPage
            offer={offersList.find((offer) => offer.id === activeCard)}
            offersList={offersList}
            onOfferTitleClick={onOfferTitleClick}
          />
        </Page>
      );
    }

    return null;
  }

  render() {
    const {onOfferTitleClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-page">
            <Page>
              <OfferPage
                offer={offersMock[0]}
                offersList={offersMock}
                onOfferTitleClick={onOfferTitleClick}
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
  activeCard: getActiveCard(state),
  offersList: getFilteredOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferTitleClick(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
