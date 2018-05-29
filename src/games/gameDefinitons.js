// @flow
import SimpleTennis from './simpleTennis/SimpleTennis';
import tennisPreview from './simpleTennis/tennisPreview.png';
import LightOn from './lightOn/LightOn';
import lightonPreview from './lightOn/lightonPreview.png';

export const gameDefinitions = [
    {
        name: 'simpleTennis',
        title: 'Simple Tennis',
        desc: 'Year: 2017. Original language: Javascript. Simple Tennis Game',
        originalLanguage: 'Javascript',
        year: '2017',
        image: tennisPreview,
        component: SimpleTennis,
        author: 'Scott Brown'
    },
    {
        name: 'lightOn',
        title: 'Light On',
        desc: 'Year: 2005. Original language: Java. Original framework: Swing',
        originalFramework: 'Swing',
        originalLanguage: 'Java',
        year: '2005',
        image: lightonPreview,
        component: LightOn,
        author: 'Scott Brown'
    }
];
