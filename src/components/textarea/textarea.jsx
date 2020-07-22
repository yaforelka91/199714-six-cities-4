import React from 'react';
import {textareaTypes} from '../../types/types';

const Textarea = ({currentMessage, maxLength, onTextareaChange}) => {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review" name="review"
      value={currentMessage}
      maxLength={`${maxLength}`}
      placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={onTextareaChange}
    />
  );
};

Textarea.defaultProps = {
  currentMessage: ``,
  maxLength: 100,
};

Textarea.propTypes = textareaTypes;

export {Textarea};
export default React.memo(Textarea);
