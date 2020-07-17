import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange(activeItem) {
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

  WithActiveItem.defaultProps = {
    activeItem: -1,
  };

  WithActiveItem.propTypes = {
    activeItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
