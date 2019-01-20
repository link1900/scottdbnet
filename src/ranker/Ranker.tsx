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
            light: '#9b4c47',
            main: '#692020',
            dark: '#3b0000',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ffd5c2',
            main: '#cfa492',
            dark: '#9d7564',
            contrastText: '#000000'
        }
    }
});

export default class Ranker extends React.Component<Props, State> {
    public render() {
        return (
            <MuiThemeProvider theme={theme}>
                <AppFlow>
                    <RankerMenuBar />
                    <div>
                        <Route exact path={`/ranker`} component={RankingList} />
                        <Route path={`/ranker/greyhounds`} component={GreyhoundList} />
                        <Route path={`/ranker/races`} component={RaceList} />
                    </div>
                </AppFlow>
            </MuiThemeProvider>
        );
    }
}
