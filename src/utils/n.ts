export default (str: string | number | undefined): number =>
  parseInt(String(str), 10);
