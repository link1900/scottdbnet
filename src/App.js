import React, { Component } from 'react';
import siteIcon from './icon.png';
import gcaIcon from './gcaLogo.png';
import linkedinLogo from './linkedin.png';
import githubLogo from './github.png';
import mailIcon from './mailIcon.png';
import diceIcon from './diceIcon.png';
import {
    Avatar, Card, CardContent, Divider, Icon, List, ListItem, ListItemIcon, ListItemText,
    Typography
} from "material-ui";

class App extends Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                <Card style={{ alignSelf: 'center', margin: 'auto' }}>
                    <CardContent>
                        <List>
                            <ListItem>
                                <Avatar src={siteIcon} alt={'Scott Brown logo'} />
                                <ListItemText primary="Scott Brown" />
                            </ListItem>
                            <Divider />
                            <ListItem button onClick={() => window.location.href = 'https://linkin-games.firebaseapp.com/'}>
                                <Avatar src={diceIcon} alt={'dice icon'} />
                                <ListItemText primary="Games" />
                            </ListItem>
                            <ListItem button onClick={() => window.location.href = 'https://agra-ranker.herokuapp.com'}>
                                <Avatar src={gcaIcon} alt={'gca logo'} />
                                <ListItemText primary="Greyhound Rankings" />
                            </ListItem>
                            <ListItem button onClick={() => window.location.href = 'mailto:link1900@gmail.com'}>
                                <Avatar src={mailIcon} alt={'email icon'} />
                                <ListItemText primary="Email" />
                            </ListItem>
                            <ListItem button onClick={() => window.location.href = 'https://github.com/link1900'}>
                                <Avatar src={githubLogo} alt={'github logo'} />
                                <ListItemText primary="Github" />
                            </ListItem>
                            <ListItem button onClick={() => window.location.href = 'https://www.linkedin.com/in/scott-brown-246882b'}>
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
