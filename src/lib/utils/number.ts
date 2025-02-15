export function isMultipleOf1000(value: number): value is number {
  return value % 1000 === 0;
}
