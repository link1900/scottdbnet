import * as React from 'react';
import SimpleTennisGame from './SimpleTennisGame';

interface Props {}

interface State {}

export default class SimpleTennis extends React.Component<Props, State> {
    public componentDidMount() {
        const canvas = this.refs.gameCanvas;
        const gameState = new SimpleTennisGame(canvas);
        gameState.start();
    }

    public render() {
        return (
            <div
                style={{
                    marginTop: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ maxWidth: '80%' }}>
                    <canvas ref="gameCanvas" width="800" height="600" style={{ border: 'black solid 1px' }} />
                </div>
            </div>
        );
    }
}
