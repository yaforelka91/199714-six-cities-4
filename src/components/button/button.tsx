import React from 'react';
import {noOperation} from '../../utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  onButtonClick?: () => void;
};

const Button: React.FC<Props> = (props: Props) => {
  const {
    children,
    className = ``,
    isDisabled = false,
    onButtonClick = noOperation
  } = props;

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

export default Button;
