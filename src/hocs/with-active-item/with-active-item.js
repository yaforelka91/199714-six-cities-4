import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange(item) {
      this.setState({
        activeItem: item,
      });
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeCard={activeItem}
          onOfferCardEnter={this._handleActiveChange}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
