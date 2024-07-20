export const extractMessageError = (errorMessage: string) => {
  // Substituir "Name" por "Nome" e "Bottom" por "Base"
  const translatedMessage = errorMessage
    .replace(/Name:/g, "Nome:")
    .replace(/Bottom:/g, "VID:")
    .replace(/weight:/g, "Peso:");

  // Atualizar a expressão regular para usar "Nome" ou "Base" e "Peso"
  const matches = translatedMessage.match(
    /(?:Nome|VID):\s*[^,]+,\s*Peso:\s*\d+/g
  );
  return matches || [];
};
