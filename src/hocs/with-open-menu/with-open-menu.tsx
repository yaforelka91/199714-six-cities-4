import React, {PureComponent} from 'react';
import {Subtract} from 'utility-types';

type State = {
  isOpen: boolean;
};

type InjectingProps = {
  isOpen: boolean;
  onToggleMenu: () => void;
  onSelectMenu: () => void;
};

const withOpenMenu = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithOpenMenu extends PureComponent<T, State> {
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
