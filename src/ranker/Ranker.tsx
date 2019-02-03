import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import RankerMenuBar from './RankerMenuBar';
import GreyhoundList from './GreyhoundList';
import RankingList from './RankingList';
import AppFlow from '../UI/AppFlow';
import RaceList from './RaceList';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

interface Props extends RouteComponentProps<any> {}

interface State {}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#293b4b',
      main: '#001523',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#a2f177',
      main: '#6fbe47',
      dark: '#3c8d14',
      contrastText: '#000000'
    }
  }
});

export default class Ranker extends React.Component<Props, State> {
  public render() {
    const { match } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <AppFlow>
          <RankerMenuBar />
          <div>
            <Route exact path={match.url} component={RankingList} />
            <Route path={`${match.url}/greyhounds`} component={GreyhoundList} />
            <Route path={`${match.url}/races`} component={RaceList} />
          </div>
        </AppFlow>
      </MuiThemeProvider>
    );
  }
}
