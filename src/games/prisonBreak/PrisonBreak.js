import React from "react";
import { Provider } from "react-redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { createStore, compose } from "redux";
import PrisonBreakContainer from "./PrisonBreakContainer";
import {
  createActionCommandSelected,
  PrisonBreakRootReducer
} from "./PrisonBreakReducer";
import MapContainer from "./MapContainer";
import { SitePage } from "../../components/SitePage";
import { Grid } from "@material-ui/core";

const store = createStore(
  PrisonBreakRootReducer,
  undefined,
  compose(autoRehydrate())
);

export default class PrisonBreak extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false };
  }

  componentWillMount() {
    persistStore(
      store,
      { keyPrefix: "prisonBreak_", whitelist: ["world"] },
      () => {
        this.setState({ loaded: true });
        store.dispatch(createActionCommandSelected("load"));
      }
    );
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <Provider store={store}>
        <SitePage>
          <Grid container spacing={4} direction="row">
            <Grid item>
              <MapContainer />
            </Grid>
            <Grid item>
              <PrisonBreakContainer name="Prison Break" />
            </Grid>
          </Grid>
        </SitePage>
      </Provider>
    );
  }
}
