import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const MAX_CITIES_COUNT = 6;
const MainWrapped = withActiveItem(Main);

class App extends PureComponent {

  _renderApp() {
    const {
      activeCard,
      offersList,
      citiesList,
      city,
      activeSorting,
      onCityNameClick,
      onOfferTitleClick,
    } = this.props;

    if (activeCard < 0) {
      return (
        <MainWrapped
          activeSorting={activeSorting}
          city={city}
          offersList={offersList}
          citiesList={citiesList}
          onOfferTitleClick={onOfferTitleClick}
          onCityNameClick={onCityNameClick}
        />
      );
    }

    if (activeCard >= 0) {
      return (
        <OfferPage
          offer={offersList.find((offer) => offer.id === activeCard)}
          offersList={offersList}
          city={city}
          onOfferTitleClick={onOfferTitleClick}
        />
      );
    }

    return null;
  }

  render() {
    const {offersList, city, onOfferTitleClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-page">
            <OfferPage
              offer={offersList[0]}
              offersList={offersList}
              city={city}
              onOfferTitleClick={onOfferTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  activeCard: state.activeCard,
  city: state.city,
  offersList: state.offersList
    .find((offer) => offer.city.id === state.city.id)
    .offers,
  activeSorting: state.activeSorting,
  citiesList: state.offersList
    .map((offer) => offer.city)
    .slice(0, MAX_CITIES_COUNT),
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onOfferTitleClick(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
