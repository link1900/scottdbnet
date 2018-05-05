// @flow

export default class Entity {
    state: string;
    name: string;
    visible: boolean;
    active: boolean;

    constructor({ state, name = '', visible = true, active = true }: { state: string, name: string, visible: boolean, active: boolean}) {
        this.state = state;
        this.name = name;
        this.visible = visible;
        this.active = active;
    }

    render() {}

    simulate() {}

    enable() {
        this.visible = true;
        this.active = true;
    }

    disable() {
        this.visible = false;
        this.active = false;
    }
}
