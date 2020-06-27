import React, {PureComponent} from 'react';

const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null,
      };

      this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    }

    _handleCardMouseEnter(offer) {
      this.setState({
        activeCard: offer,
      });
    }

    render() {
      return (
        <Component
          onOfferCardEnter={this._handleCardMouseEnter}
          {...this.props}
        />
      );
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
