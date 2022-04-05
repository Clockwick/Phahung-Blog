const classNames = (
  ...classes: (false | null | undefined | string | number | boolean)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

export default classNames;
