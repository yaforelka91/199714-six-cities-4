import React, {PureComponent} from 'react';

const withOpenMenu = (Component) => {
  class WithOpenMenu extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this._handleButtonClick = this._handleButtonClick.bind(this);
      this._handleSelectClick = this._handleSelectClick.bind(this);
    }

    _handleButtonClick() {
      this.setState((prevState) => ({
        isOpen: !prevState.isOpen,
      }));
    }

    _handleSelectClick() {
      this.setState({
        isOpen: false,
      });
    }

    render() {
      const {isOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isOpen}
          onToggleMenu={this._handleButtonClick}
          onSelectMenu={this._handleSelectClick}
        />
      );
    }
  }

  return WithOpenMenu;
};

export default withOpenMenu;
