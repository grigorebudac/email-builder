export function unixToReadableFormat(date: number) {
  return new Date(date).toLocaleDateString('en-US');
}
