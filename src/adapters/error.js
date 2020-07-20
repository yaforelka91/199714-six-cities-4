const adaptError = (errorText) => {
  return errorText.match(/\[(.*?)\]/)[1];
};

export default adaptError;
