import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {OfferTypes} from '../../const.js';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedOffer: null,
    };
  }

  _renderApp() {
    const {offersCount, offersList} = this.props;
    const {selectedOffer} = this.state;

    if (!selectedOffer) {
      return (
        <Main
          offersCount={offersCount}
          offersList={offersList}
          onOfferTitleClick={(offer) => {
            this.setState({
              selectedOffer: offer,
            });
          }}
        />
      );
    }

    if (selectedOffer) {
      return (
        <OfferPage offer={selectedOffer} />
      );
    }

    return null;
  }

  render() {
    const {offersList} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-page">
            <OfferPage offer={offersList[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offersList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.arrayOf(PropTypes.string).isRequired,
        pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
        picture: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf([
          OfferTypes.APARTMENT,
          OfferTypes.ROOM,
          OfferTypes.HOUSE,
          OfferTypes.HOTEL]).isRequired,
        isPremium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        bedrooms: PropTypes.string.isRequired,
        guests: PropTypes.string.isRequired,
        services: PropTypes.arrayOf(PropTypes.string).isRequired,
        host: PropTypes.shape({
          name: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
          isSuper: PropTypes.bool.isRequired,
        })
      }).isRequired
  ).isRequired,
};

export default App;
