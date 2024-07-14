const sceneRegister = new Map<string, Class>();

export function registerScene(name: string, clazz: Class) {
  sceneRegister.set(name, clazz);
  return name;
}

export function getScene(name: string): Class {
  const found = sceneRegister.get(name);
  if (!found) {
    throw new Error(`Unable to find scene "${name}" in registry`);
  }
  return found;
}

export function getScenes(names: string[]): Class[] {
  return names.map((n) => getScene(n));
}
