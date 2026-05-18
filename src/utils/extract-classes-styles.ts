export const extractClassesStyles = (className: string, ...params: string[]) => {
  const regex = new RegExp(`(\\w+-)?(${params.join('|')})-\\w+`, 'gmi');

  return className.match(regex)?.join('') ?? '';
};
