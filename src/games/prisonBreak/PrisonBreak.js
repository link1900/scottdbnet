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
import { PageLayout } from "../../components/PageLayout";
import { Row } from "../../components/Row";

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

  componentDidMount() {
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
      <PageLayout title="Prison Break">
        <Provider store={store}>
          <Row spacing={4}>
            <MapContainer />
            <PrisonBreakContainer name="Prison Break" />
          </Row>
        </Provider>
      </PageLayout>
    );
  }
}
