// @flow
import React from 'react';
import CanvasElement from './CanvasElement';

export type Props = {
    elements: Array<CanvasElement>,
    width: number,
    height: number
};

export default class SimpleCanvas extends React.Component<Props, *> {
    componentDidMount() {
        const canvas = this.refs.gameCanvas;
        canvas.addEventListener('mousedown', event => {
            const mouseX = event.pageX - canvas.offsetLeft;
            const mouseY = event.pageY - canvas.offsetTop;
            this.props.elements.forEach(element => {
                if (element.containsPoint(mouseX, mouseY)) {
                    element.onClick(this.props.elements);
                }
            });
        });
        this.start(canvas);
    }

    simulate() {
        this.props.elements.forEach(element => element._simulate(this.props.elements));
    }

    draw(canvas: HTMLCanvasElement) {
        this.props.elements.forEach(element => element._draw(canvas));
    }

    start(canvas: HTMLCanvasElement) {
        const framesPerSecond = 60;
        setInterval(() => {
            this.simulate();
            this.draw(canvas);
        }, 1000 / framesPerSecond);
    }

    render() {
        const { width, height } = this.props;
        return <canvas ref="gameCanvas" width={width} height={height} style={{ border: 'black solid 1px' }} />;
    }
}
