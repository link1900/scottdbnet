// @flow
import React, { Component } from 'react';
import { Avatar, Card, CardContent, Divider, List, ListItem, ListItemText } from 'material-ui';
import siteIcon from './icon.png';
import gcaIcon from './gcaLogo.png';
import linkedinLogo from './linkedin.png';
import githubLogo from './github.png';
import mailIcon from './mailIcon.png';
import diceIcon from './diceIcon.png';

class App extends Component<*,*> {
    navigateTo(url: string) {
        window.location.href = url;
    }

    render() {
        return (
            <div className="fullPage centerParent">
                <Card className="centerChild">
                    <CardContent>
                        <List>
                            <ListItem>
                                <Avatar src={siteIcon} alt={'Scott Brown logo'} />
                                <ListItemText primary="Scott Brown" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => this.navigateTo('https://linkin-games.firebaseapp.com/')}>
                                <Avatar src={diceIcon} alt={'dice icon'} />
                                <ListItemText primary="Games" />
                            </ListItem>
                            <ListItem button onClick={() => this.navigateTo('https://agra-ranker.herokuapp.com')}>
                                <Avatar src={gcaIcon} alt={'gca logo'} />
                                <ListItemText primary="Greyhound Rankings" />
                            </ListItem>
                            <ListItem button onClick={() => this.navigateTo('mailto:link1900@gmail.com')}>
                                <Avatar src={mailIcon} alt={'email icon'} />
                                <ListItemText primary="Email" />
                            </ListItem>
                            <ListItem button onClick={() => this.navigateTo('https://github.com/link1900')}>
                                <Avatar src={githubLogo} alt={'github logo'} />
                                <ListItemText primary="Github" />
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => this.navigateTo('https://www.linkedin.com/in/scott-brown-246882b')}
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

export default App;
