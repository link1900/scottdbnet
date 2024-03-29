import lodashShuffle from "lodash/shuffle";

export function generateArray<T>(
  length: number,
  generateFunction: () => T
): T[] {
  return Array.from({ length }, generateFunction);
}

export function groupArray<T>(items: T[]) {
  return items.reduce((groups: Array<{ key: T; values: T[] }>, item: T) => {
    const currentGroup = groups.find((g) => g.key === item);
    if (currentGroup) {
      currentGroup.values.push(item);
      return groups;
    } else {
      const newGroup = { key: item, values: [item] };
      groups.push(newGroup);
      return groups;
    }
  }, []);
}

export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}

export function copyArray<T>(items: T[]): T[] {
  return [...items];
}

export function shuffle<T>(items: T[]): T[] {
  return lodashShuffle(items);
}
