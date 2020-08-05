import * as React from 'react';
import {Subtract} from 'utility-types';

type State = {
  activeItem: number | string;
}

type InjectingProps = {
  activeItem: number | string;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
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

    _handleActiveChange(activeItem: string | number) {
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
  }

  return WithActiveItem;
};

export default withActiveItem;
