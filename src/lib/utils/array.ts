export function findDuplicates<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2); // Convert array2 to a Set
  return array1.filter((item) => set2.has(item)); // Use Set's has() method
}
