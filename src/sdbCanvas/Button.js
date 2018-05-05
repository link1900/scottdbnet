import Rect from './Rect';

export default class Button extends Rect {
    constructor(props) {
        super(props);
        const { text } = props;
        this.text = text;
    }

    render() {
        if (!this.visible) {
            return null;
        }
        super.render();
        return null;
    }
}
