export const cleanString = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, '');

export type ComboboxItemm = {
  label: string;
  value: string;
};

export const ComboboxItemm = {
  queryFilter: (query: string, item: ComboboxItemm): boolean =>
    cleanString(item.label).includes(cleanString(query)),
  handleValue: (item: ComboboxItemm): string => item.value,
};
