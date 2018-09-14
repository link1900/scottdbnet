import * as React from 'react';
import { Redirect } from 'react-router';

interface Props {}

interface State {}

export default class Director extends React.Component<Props, State> {
    private redirectForDomain = [
        {
            name: 'games.scottdb.net',
            url: '/games'
        }
    ];

    private getRedirectUrl = () => {
        const host = window.location.hostname;
        const redirectOverride = this.redirectForDomain.find(redirect => redirect.name === host);
        if (redirectOverride) {
            return redirectOverride.url;
        }
        return '/home';
    };

    public render() {
        return <Redirect to={this.getRedirectUrl()} />;
    }
}
