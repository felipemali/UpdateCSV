export const extractMessageError = (errorMessage: string) => {
  const matches = errorMessage.match(/Name:\s*[^,]+,\s*weight:\s*\d+/g);
  console.log(matches);

  return matches || [];
};
