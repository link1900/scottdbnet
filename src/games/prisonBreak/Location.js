export function connectLocations(
  fromLocation,
  toLocation,
  direction,
  locked = false
) {
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
  if (direction === "north") {
    return "south";
  }
  if (direction === "south") {
    return "north";
  }
  if (direction === "east") {
    return "west";
  }
  if (direction === "west") {
    return "east";
  }
  return "north";
}

export function convertToDirection(possibleDirection) {
  if (["n", "up", "north"].includes(possibleDirection)) {
    return "north";
  }
  if (["s", "down", "south"].includes(possibleDirection)) {
    return "south";
  }
  if (["e", "right", "east"].includes(possibleDirection)) {
    return "east";
  }
  if (["w", "left", "west"].includes(possibleDirection)) {
    return "west";
  }
  return null;
}
