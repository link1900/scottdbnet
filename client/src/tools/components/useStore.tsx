import { merge } from "lodash";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { base64DecodeString } from "../../util/stringHelper";
import { ListRandomizerStore } from "../listRandomizer/ListRandomizer";

export type useStoreProps<StoreType> = {
  localStoreKey: string;
  defaultStore: StoreType;
};

function getUrlStore(
  urlSearch: string
): Partial<ListRandomizerStore> | undefined {
  const storeParameter = new URLSearchParams(urlSearch).get("store");
  if (!storeParameter) {
    return undefined;
  }
  try {
    return JSON.parse(base64DecodeString(storeParameter));
  } catch {
    return undefined;
  }
}

export function useStore<StoreType>(
  props: useStoreProps<StoreType>
): [StoreType, (store: StoreType) => void, () => void] {
  const { localStoreKey, defaultStore } = props;
  const { search } = useLocation();
  const urlStore = getUrlStore(search);
  const [localStore, setLocalStore, removeLocalStore] =
    useLocalStorage<StoreType>(localStoreKey);

  const [store, setStoreState] = useState<StoreType>(
    merge(defaultStore, urlStore, localStore)
  );

  const setStore = (updatedStore: Partial<StoreType>) => {
    const toChange = {
      ...store,
      ...updatedStore
    };
    setLocalStore(toChange);
    setStoreState(toChange);
  };

  const resetStore = () => {
    setStoreState(defaultStore);
    removeLocalStore();
  };

  return [store, setStore, resetStore];
}
