import React from 'react';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createStore, compose } from 'redux';
import PrisonBreakContainer from './PrisonBreakContainer';
import { createActionCommandSelected, PrisonBreakRootReducer } from './PrisonBreakReducer';
import PageFlow from '../../UI/PageFlow';
import Spacing from '../../UI/Spacing';
import MapContainer from './MapContainer';
import Row from '../../UI/Row';

const store = createStore(PrisonBreakRootReducer, undefined, compose(autoRehydrate()));

export default class PrisonBreak extends React.Component {
  constructor() {
    super();
    this.state = { loaded: false };
  }

  componentWillMount() {
    persistStore(store, { keyPrefix: 'prisonBreak_', whitelist: ['world'] }, () => {
      this.setState({ loaded: true });
      store.dispatch(createActionCommandSelected('load'));
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }
    return (
      <Provider store={store}>
        <PageFlow>
          <Spacing />
          <Row>
            <MapContainer />
            <PrisonBreakContainer name="Prison Break" />
          </Row>
        </PageFlow>
      </Provider>
    );
  }
}
