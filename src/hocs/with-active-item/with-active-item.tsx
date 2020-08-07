import React, {PureComponent} from 'react';
import {Subtract} from 'utility-types';

type Props = {
  activeItem?: number | string;
}

type State = {
  activeItem: number | string;
}

type InjectingProps = {
  activeItem: number | string;
  onActiveChange: (activeItem: number | string) => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithActiveItem extends PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.activeItem !== this.props.activeItem) {
        this.setState({
          activeItem: this.props.activeItem
        });
      }
    }

    _handleActiveChange(activeItem: number | string) {
      this.setState({
        activeItem,
      });
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onActiveChange={this._handleActiveChange}
        />
      );
    }

    public static defaultProps = {
      activeItem: -1,
    };
  }

  return WithActiveItem;
};

export default withActiveItem;
