import { includes } from 'lodash';

export const itemTypes = ['item', 'equipment', 'consumable', 'key', 'weapon', 'shield'];

export const equipmentTypes = ['weapon', 'shield'];

export function isItem(type) {
  return includes(itemTypes, type);
}
