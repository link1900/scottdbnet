import React from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { HeadlineSmall } from '../UI/HeadlineSmall';
import FlexExpander from '../UI/FlexExpander';
import UserProfileButton from '../auth/UserProfileButton';
import Spacing from '../UI/Spacing';

interface Props extends RouteComponentProps<any> {}

interface State {
    menuOpen: boolean;
}

class RankerMenuBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    public getHighlight(url: string): number {
        if (url.includes('greyhounds')) {
            return 1;
        }
        if (url.includes('races')) {
            return 2;
        }
        return 0;
    }

    public navTo(url: string) {
        this.props.history.push(url);
    }

    public render() {
        const { history } = this.props;

        return (
            <div>
                <AppBar key="appBar" position="static" style={{ backgroundColor: '#692020' }}>
                    <Toolbar>
                        <HeadlineSmall>GCA Ranker</HeadlineSmall>
                        <Spacing />
                        <Tabs value={this.getHighlight(history.location.pathname)}>
                            <Tab label="Rankings" onClick={() => this.navTo('/ranker')} />
                            <Tab label="Greyhounds" onClick={() => this.navTo('/ranker/greyhounds')} />
                            <Tab label="Races" onClick={() => this.navTo('/ranker/races')} />
                        </Tabs>
                        <FlexExpander />
                        <UserProfileButton />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default compose(withRouter)(RankerMenuBar);
