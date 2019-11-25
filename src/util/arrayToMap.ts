type ObjectWithId = { id: number | string } & Record<string, any>;

export default function<T extends ObjectWithId>(arr: T[]) {
  const emptyMap: Record<string, T> = {};
  return arr.reduce(
    (accumulator, item) => ({
      [item.id]: item,
      ...accumulator
    }),
    emptyMap
  );
}
