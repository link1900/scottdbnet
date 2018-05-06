// @flow
import SimpleTennis from './simpleTennis/SimpleTennis';
import tennisPreview from './simpleTennis/tennisPreview.png';

export const GAME_STATES = {
    ALPHA: 'ALPHA',
    COMPLETE: 'COMPLETE'
};

export const gameInfos = [
    {
        name: 'simpleTennis',
        title: 'Simple Tennis',
        desc: 'Year: 2017. Original language: Javascript. Simple Tennis Game',
        originalLanguage: 'Javascript',
        year: '2017',
        image: tennisPreview,
        component: SimpleTennis,
        author: 'Scott Brown',
        state: GAME_STATES.COMPLETE
    }
];

export function getGameList() {
    return gameInfos.filter(() => true);
}
