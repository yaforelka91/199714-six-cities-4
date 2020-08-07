import React, {memo} from 'react';

type Props = {
  currentMessage?: string;
  maxLength?: number;
  onTextareaChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea: React.FC<Props> = (props: Props) => {
  const {
    currentMessage = ``,
    maxLength = 100,
    onTextareaChange
  } = props;
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review" name="review"
      value={currentMessage}
      maxLength={maxLength}
      placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={onTextareaChange}
    />
  );
};

export {Textarea};
export default memo(Textarea);
