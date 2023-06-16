export const capFirstLetter = string => {
  const result = string && string.charAt(0).toUpperCase() + string.slice(1);
  return result || string;
};
