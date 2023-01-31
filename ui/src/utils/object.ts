type StringObject = { [key: string]: string };

export const allToNegative = (obj: StringObject) => {
  const negativeSpacing: StringObject = {};

  for (const key in obj) {
    negativeSpacing[`-${key}`] = `-${obj[key]}`;
  }

  return negativeSpacing;
};
