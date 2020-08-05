import * as React from 'react';
import {noOperation} from '../../utils';

type Props = {
  className?: string;
  isDisabled?: boolean;
  children: React.ReactNode;
  onButtonClick?: () => void;
};

const Button: React.FC<Props> = (props: Props) => {
  const {
    className = ``,
    isDisabled = false,
    children,
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
