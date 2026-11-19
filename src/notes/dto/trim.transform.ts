export const Trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;