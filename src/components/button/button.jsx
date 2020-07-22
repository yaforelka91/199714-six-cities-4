import React from 'react';
import {buttonTypes} from '../../types/types';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const Button = ({className, activeItem, onActiveChange, onButtonClick, children}) => {
  return (
    <button
      className={`${className ? `${className} ` : ``}${activeItem === 1 && className ? `${className}--active ` : ``}button`}
      type="button"
      onClick={() => {
        onActiveChange(+!activeItem);
        onButtonClick(+!activeItem);
      }}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: ``,
  onActiveChange: () => {},
  onButtonClick: () => {},
  activeItem: 0
};

Button.propTypes = buttonTypes;

export {Button};
export default withActiveItem(Button);
