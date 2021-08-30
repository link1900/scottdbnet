import { includes } from 'lodash';

export function connectLocations(fromLocation, toLocation, direction, locked = false) {
  fromLocation.paths.push({
    fromLocationId: fromLocation.id,
    toLocationId: toLocation.id,
    direction,
    locked
  });
  const oppositeDirection = flipDirection(direction);
  toLocation.paths.push({
    toLocationId: fromLocation.id,
    fromLocationId: toLocation.id,
    direction: oppositeDirection,
    locked
  });
  return fromLocation;
}

export function flipDirection(direction) {
  if (direction === 'north') {
    return 'south';
  }
  if (direction === 'south') {
    return 'north';
  }
  if (direction === 'east') {
    return 'west';
  }
  if (direction === 'west') {
    return 'east';
  }
  return 'north';
}

export function convertToDirection(possibleDirection) {
  if (includes(['n', 'up', 'north'], possibleDirection)) {
    return 'north';
  }
  if (includes(['s', 'down', 'south'], possibleDirection)) {
    return 'south';
  }
  if (includes(['e', 'right', 'east'], possibleDirection)) {
    return 'east';
  }
  if (includes(['w', 'left', 'west'], possibleDirection)) {
    return 'west';
  }
  return null;
}
