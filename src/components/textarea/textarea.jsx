import React from 'react';
import {textareaTypes} from '../../types/types';

const Textarea = ({currentMessage, onTextareaChange}) => {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review" name="review"
      value={currentMessage}
      placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={onTextareaChange}
    />
  );
};

Textarea.defaultProps = {
  currentMessage: ``,
};

Textarea.propTypes = textareaTypes;

export {Textarea};
export default React.memo(Textarea);
