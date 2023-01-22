const checkStringComposedOnlyLetter = (string: string) => {
  if (string.length === 0) return false;

  const lowerString = string.toLowerCase();

  for (let i = 0; i < lowerString.length; i += 1) {
    if (!lowerString[i].match(/[a-z]/i)) return false;
  }

  return true;
};
export default checkStringComposedOnlyLetter;
