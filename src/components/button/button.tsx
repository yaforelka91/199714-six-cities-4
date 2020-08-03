import * as React from 'react';

type Props = {
  className: string;
  isDisabled?: boolean;
  children: React.ReactNode;
  onButtonClick: () => void;
};

const Button: React.FC<Props> = (props: Props) => {
  const {
    className = ``,
    isDisabled = false,
    onButtonClick = () => null,
    children
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
