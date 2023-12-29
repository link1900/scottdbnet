import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch
} from "@material-ui/core";
import React from "react";
import { RandomJokeStore } from "./RandomJoke";

export interface RandomJokeOptionsProps {
  open: boolean;
  onClose: () => void;
  store: RandomJokeStore;
  setStore: (store: RandomJokeStore) => void;
}

export default function RandomJokeOptions(props: RandomJokeOptionsProps) {
  const { store, setStore } = props;

  const updateOption = (name: string, enabled: boolean) => {
    const updateOptions = store.options.map((option) => {
      if (option.name === name) {
        option.enabled = enabled;
        return option;
      } else {
        option.enabled = false;
        return option;
      }
    });
    setStore({ options: updateOptions });
  };

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={props.open}
      PaperProps={{ style: { width: 256 } }}
      onClose={() => props.onClose()}
    >
      <List>
        {store.options.map((option) => {
          return (
            <ListItem key={`${option.name}-listitem`}>
              <ListItemText primary={option.label} />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={option.enabled}
                  onChange={(e) => updateOption(option.name, e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <Divider key="support-section" />
        <ListItem key="close" button>
          <ListItemText primary="Close" onClick={() => props.onClose()} />
        </ListItem>
      </List>
    </Drawer>
  );
}
