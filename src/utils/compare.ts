export const value = (card: string): number => {
  switch (card) {
    case "JACK":
      return 11;
    case "QUEEN":
      return 12;
    case "KING":
      return 13;
    case "ACE":
      return 1;
    default:
      return parseInt(card);
  }
};
export const comparision = (first: string, second: string): number => {
  const firstValue = value(first);
  const secondValue = value(second);
  if (firstValue > secondValue) {
    return 1;
  } else if (firstValue === secondValue) {
    return 0;
  } else {
    return -1;
  }
};
