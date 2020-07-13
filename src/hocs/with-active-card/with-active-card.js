import React, {PureComponent} from 'react';

const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: -1,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange(item) {
      this.setState({
        activeCard: item,
      });
    }

    render() {
      const {activeCard} = this.state;

      return (
        <Component
          {...this.props}
          activeCard={activeCard}
          onOfferCardEnter={this._handleActiveChange}
        />
      );
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
