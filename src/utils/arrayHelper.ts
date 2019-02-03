export function generateArray<T>(length: number, generateFunction: () => T): T[] {
  return Array.from({ length }, generateFunction);
}

export function groupArray<T>(items: T[]) {
  return items.reduce((groups: Array<{ key: T; values: T[] }>, item: T) => {
    const currentGroup = groups.find(g => g.key === item);
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
