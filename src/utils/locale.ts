export const formatLocale = (
  t: (key: string, params?: Record<string, unknown>) => string,
  key1: string,
  valueKey1: string,
  key2?: string,
  value?: string,
) => {
  const convertToSnakeCase = (str: string) => {
    return str.replace(/\s+/g, "_").toUpperCase();
  };
  const formattedKey1 = convertToSnakeCase(valueKey1);
  const formattedValue = value ? { value: t(`${key2}.${value}`) } : {};
  return t(`${key1}.${formattedKey1}`, formattedValue);
};
