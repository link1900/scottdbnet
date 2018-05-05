import React from 'react';
import SimpleTennisGame from './SimpleTennisGame';

export default class SimpleTennis extends React.Component {
    componentDidMount() {
        const canvas = this.refs.gameCanvas;
        const gameState = new SimpleTennisGame(canvas);
        gameState.start();
    }

    render() {
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
