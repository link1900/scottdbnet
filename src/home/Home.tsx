import { Avatar, Card, CardContent, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import * as React from 'react';
import diceIcon from './diceIcon.png';
import gcaIcon from './gcaLogo.png';
import githubLogo from './github.png';
import siteIcon from './icon.png';
import linkedinLogo from './linkedin.png';
import mailIcon from './mailIcon.png';
import { FlatLink } from '../UI/FlatLink';

interface Props {}

interface State {}

export default class Home extends React.Component<Props, State> {
    public navigateTo(url: string): void {
        window.location.href = url;
    }

    public navigateOnClick = (url: string): (() => void) => {
        return () => {
            this.navigateTo(url);
        };
    };

    public componentWillMount() {
        document.body.style.backgroundColor = '#9E9E9E';
    }

    public componentWillUnmount() {
        document.body.style.backgroundColor = null;
    }

    public render() {
        return (
            <div style={{ paddingTop: '40px', display: 'flex', justifyContent: 'center' }}>
                <Card>
                    <CardContent>
                        <List>
                            <ListItem>
                                <Avatar src={siteIcon} alt={'Scott Brown logo'} />
                                <ListItemText primary="Scott Brown" />
                            </ListItem>
                            <Divider />
                            <FlatLink to={'/games'}>
                                <ListItem button={true}>
                                    <Avatar src={diceIcon} alt={'dice icon'} />
                                    <ListItemText primary="Linkin Games" />
                                </ListItem>
                            </FlatLink>
                            <ListItem button={true} onClick={this.navigateOnClick('https://agra-ranker.herokuapp.com')}>
                                <Avatar src={gcaIcon} alt={'gca logo'} />
                                <ListItemText primary="Greyhound Rankings" />
                            </ListItem>
                            <ListItem button={true} onClick={this.navigateOnClick('mailto:link1900@gmail.com')}>
                                <Avatar src={mailIcon} alt={'email icon'} />
                                <ListItemText primary="Email" />
                            </ListItem>
                            <ListItem button={true} onClick={this.navigateOnClick('https://github.com/link1900')}>
                                <Avatar src={githubLogo} alt={'github logo'} />
                                <ListItemText primary="Github" />
                            </ListItem>
                            <ListItem
                                button={true}
                                onClick={this.navigateOnClick('https://www.linkedin.com/in/scott-brown-246882b')}
                            >
                                <Avatar src={linkedinLogo} alt={'linkedin logo'} />
                                <ListItemText primary="Linkedin" />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
