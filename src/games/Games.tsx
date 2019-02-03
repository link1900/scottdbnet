import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import GamesMenuBar from './GamesMenuBar';
import GamesHome from './GamesHome';
import { gameDefinitions } from './gameDefinitons';

interface Props extends RouteComponentProps<any> {}

interface State {}

export default class Games extends React.Component<Props, State> {
  public render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <GamesMenuBar />
        <div>
          <Route exact path="/games" component={GamesHome} />
          {gameDefinitions.map(gameInfo => (
            <Route key={gameInfo.name} path={`/games/${gameInfo.name}`} component={gameInfo.component} />
          ))}
        </div>
      </div>
    );
  }
}
