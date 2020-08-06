const adaptError = (errorText: string): string => errorText.match(/\[(.*?)\]/)[1];

export default adaptError;
