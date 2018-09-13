import { find } from 'lodash';

export function getPlayerLocation(state) {
    const player = getPlayer(state);
    if (!player) {
        return null;
    }
    return find(state.world.locations, { id: player.locationId });
}

export function getPlayer(state) {
    return find(state.world.entities, { type: 'player' });
}

export function getPlayerScore(state) {
    return getPlayer(state).score;
}
