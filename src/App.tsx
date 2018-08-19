import { Avatar, Card, CardContent, Divider, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import * as React from 'react';
import diceIcon from './diceIcon.png';
import gcaIcon from './gcaLogo.png';
import githubLogo from './github.png';
import siteIcon from './icon.png';
import linkedinLogo from './linkedin.png';
import mailIcon from './mailIcon.png';

class App extends React.Component<any, any> {
    public navigateTo(url: string): void {
        window.location.href = url;
    }

    public navigateOnClick = (url: string): (() => void) => {
        return () => {
            this.navigateTo(url);
        };
    };

    public render() {
        return (
            <Grid
                container={true}
                spacing={0}
                justify="center"
                style={{ paddingTop: '40px', height: '100vh', backgroundColor: '#9E9E9E' }}
            >
                <Grid item={true} xs={10} sm={6} md={4} lg={3} xl={2}>
                    <Card>
                        <CardContent>
                            <List>
                                <ListItem>
                                    <Avatar src={siteIcon} alt={'Scott Brown logo'} />
                                    <ListItemText primary="Scott Brown" />
                                </ListItem>
                                <Divider />
                                <ListItem
                                    button={true}
                                    onClick={this.navigateOnClick('https://linkin-games.firebaseapp.com/')}
                                >
                                    <Avatar src={diceIcon} alt={'dice icon'} />
                                    <ListItemText primary="Games" />
                                </ListItem>
                                <ListItem
                                    button={true}
                                    onClick={this.navigateOnClick('https://agra-ranker.herokuapp.com')}
                                >
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
                </Grid>
            </Grid>
        );
    }
}

export default App;
