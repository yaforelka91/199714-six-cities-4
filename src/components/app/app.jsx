import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedOffer: null,
    };

    this._handleOfferTitleClick = this._handleOfferTitleClick.bind(this);
  }

  _handleOfferTitleClick(offer) {
    this.setState({
      selectedOffer: offer,
    });
  }

  _renderApp() {
    const {offersList} = this.props.settings;
    const {selectedOffer} = this.state;

    if (!selectedOffer) {
      return (
        <Main
          offersList={offersList}
          onOfferTitleClick={(offer)=>{
            this._handleOfferTitleClick(offer);
          }}
        />
      );
    }

    if (selectedOffer) {
      return (
        <OfferPage
          offer={selectedOffer}
          offersList={offersList}
          onOfferTitleClick={this._handleOfferTitleClick}
        />
      );
    }

    return null;
  }

  render() {
    const {offersList} = this.props.settings;

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
              onOfferTitleClick={this._handleOfferTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  settings: PropTypes.shape({
    offersList: PropTypes.arrayOf(
        PropTypes.shape().isRequired
    ).isRequired,
  })
};

export default App;
