import React from 'react';
import {buttonTypes} from '../../types/types';

const Button = ({className, isDisabled, onButtonClick, children}) => {
  return (
    <button
      className={`${className ? `${className} ` : ``}button`}
      type="button"
      disabled={isDisabled}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: ``,
  onButtonClick: () => {},
  isDisabled: false,
};

Button.propTypes = buttonTypes;

export default Button;
