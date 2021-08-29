import { GameOfLife } from "./gameOfLife/GameOfLife";
// import SimpleTennis from './simpleTennis/SimpleTennis';
// import tennisPreview from './simpleTennis/tennisPreview.png';
// import LightOn from './lightOn/LightOn';
// import lightOnPreview from './lightOn/lightOnPreview.png';
// import prisonBreakPreview from './prisonBreak/prisonBreakPreview.png';
// import PrisonBreak from './prisonBreak/PrisonBreak';
import { Guesser } from "./guesser/Guesser";
// import Tic from './tictactoe/Tic';
// import ticPreview from './tictactoe/ticPreview.png';
import GuesserPreview from "./guesser/thinking.jpg";
import GuesserAIPreview from "./guesserAI/thinkingAI.png";
import { GuesserAI } from "./guesserAI/GuesserAI";
import gameOfLifePreview from "./gameOfLife/conway_game_of_life.png";

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
  // {
  //   name: 'simpleTennis',
  //   title: 'Simple Tennis',
  //   originalLanguage: 'Javascript',
  //   year: '2017',
  //   image: tennisPreview,
  //   component: SimpleTennis,
  //   author: 'Scott Brown'
  // },
  // {
  //   name: 'lightOn',
  //   title: 'Light On',
  //   originalFramework: 'Swing',
  //   originalLanguage: 'Java',
  //   year: '2005',
  //   image: lightOnPreview,
  //   component: LightOn,
  //   author: 'Scott Brown'
  // },
  // {
  //   name: 'prisonBreak',
  //   title: 'Prison Break',
  //   desc: 'Year: 2007. Original language: C++',
  //   originalLanguage: 'C++',
  //   year: '2007',
  //   image: prisonBreakPreview,
  //   component: PrisonBreak,
  //   author: 'Scott Brown'
  // },
  {
    name: "guesser",
    title: "Guess the number",
    originalFramework: "TI-86 Calculator",
    originalLanguage: "Basic",
    image: GuesserPreview,
    year: "2002",
    component: Guesser,
    author: "Scott Brown"
  },
  {
    name: "guesser-ai",
    title: "Guess the number AI",
    originalLanguage: "Javascript",
    image: GuesserAIPreview,
    year: "2018",
    component: GuesserAI,
    author: "Scott Brown"
  },
  // {
  //   name: 'tic',
  //   title: 'Noughts and Crosses',
  //   originalFramework: 'React',
  //   originalLanguage: 'Javascript',
  //   year: '2016',
  //   component: Tic,
  //   image: ticPreview,
  //   author: 'Scott Brown'
  // },
  {
    name: "cgol",
    title: "Conway's Game of Life",
    originalFramework: "React",
    originalLanguage: "Typescript",
    year: "2021",
    component: GameOfLife,
    image: gameOfLifePreview,
    author: "Scott Brown"
  }
];
