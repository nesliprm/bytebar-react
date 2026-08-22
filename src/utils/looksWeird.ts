export const looksWeird = (input: string) =>
  input.length > 3 && !/[aeiou]/i.test(input) && /^[a-zA-Z\s]+$/.test(input);
