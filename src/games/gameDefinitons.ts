import SimpleTennis from './simpleTennis/SimpleTennis';
import tennisPreview from './simpleTennis/tennisPreview.png';
import LightOn from './lightOn/LightOn';
import lightOnPreview from './lightOn/lightOnPreview.png';
import prisonBreakPreview from './prisonBreak/prisonBreakPreview.png';
import PrisonBreak from './prisonBreak/PrisonBreak';
import Guesser from './guesser/Guesser';
import Tic from './tictactoe/Tic';
import ticPreview from './tictactoe/ticPreview.png';
import GuesserPreview from './guesser/thinking.jpg';

export interface GameDefinition {
    name?: string;
    title?: string;
    desc?: string;
    originalFramework?: string;
    originalLanguage?: string;
    year?: string;
    image?: any;
    component?: any;
    author?: string;
}

export const gameDefinitions: GameDefinition[] = [
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
        image: lightOnPreview,
        component: LightOn,
        author: 'Scott Brown'
    },
    {
        name: 'prisonBreak',
        title: 'Prison Break',
        desc: 'Year: 2007. Original language: C++',
        originalLanguage: 'C++',
        year: '2007',
        image: prisonBreakPreview,
        component: PrisonBreak,
        author: 'Scott Brown'
    },
    {
        name: 'guesser',
        title: 'Guess the number',
        originalFramework: 'TI-86 Calculator',
        originalLanguage: 'Basic',
        image: GuesserPreview,
        year: '2002',
        desc: 'Year: 2002. Original language: Basic. Original framework: TI-86 Calculator',
        component: Guesser,
        author: 'Scott Brown'
    },
    {
        name: 'tic',
        title: 'Noughts and Crosses',
        originalFramework: 'React',
        originalLanguage: 'Javascript',
        year: '2016',
        component: Tic,
        image: ticPreview,
        author: 'Scott Brown'
    }
];
