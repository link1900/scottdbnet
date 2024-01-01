import { Component } from "bitecs";

export type ComponentStructure = { [key: string]: Component };

export type EntityProxy<CS extends ComponentStructure> = {
  id: number;
} & {
  [key in keyof CS]: ComponentProxy<CS[key]>;
};

export type ComponentProxy<C extends Component> = {
  [key in keyof C]: number;
};

export function componentProxyBuilder<C extends Component>(
  component: C
): ComponentProxy<C> {
  const componentProxy: unknown = {
    id: 0,
    component
  };
  Object.keys(component).forEach((key) => {
    Object.defineProperty(componentProxy, key, {
      get() {
        return this.component[key][this.id];
      },
      set(newValue) {
        this.component[key][this.id] = newValue;
      }
    });
  });
  return componentProxy as ComponentProxy<C>;
}

export function entityProxyBuilder<CS extends ComponentStructure>(
  componentStructure: CS
): EntityProxy<CS> {
  const entityProxy: any = {
    _id: 0,
    get id() {
      return this._id;
    },
    set id(newId: number) {
      this._id = newId;
      Object.entries(this).forEach(([key, value]) => {
        if (key !== "id" && key !== "_id") {
          (value as any).id = newId;
        }
      });
    }
  };

  Object.entries(componentStructure).forEach(([key, value]) => {
    entityProxy[key] = componentProxyBuilder(value);
  });

  return entityProxy as EntityProxy<CS>;
}
