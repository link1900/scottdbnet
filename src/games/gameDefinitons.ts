import { lazy } from "react";
import tennisPreview from "./simpleTennis/tennisPreview.png";
import LightOn from "./lightOn/LightOn";
import lightOnPreview from "./lightOn/lightOnPreview.png";
import prisonBreakPreview from "./prisonBreak/prisonBreakPreview.png";
import ticPreview from "./tictactoe/ticPreview.png";
import GuesserPreview from "./guesser/thinking.jpg";
import GuesserAIPreview from "./guesserAI/thinkingAI.png";
import gameOfLifePreview from "./gameOfLife/conway_game_of_life.png";
import balloonGamesPreview from "./balloonGames/balloon-games.png";

export type GameLinkType = "react" | "unity";

export interface GameDefinition {
  name: string;
  title: string;
  desc?: string;
  originalFramework?: string;
  originalLanguage?: string;
  originalYear?: string;
  image?: any;
  component?: any;
  author?: string;
  linkType?: GameLinkType;
  remakeFramework?: string;
  remakeLanguage?: string;
  remakeYear?: string;
}

export const gameDefinitions: GameDefinition[] = [
  {
    name: "simpleTennis",
    title: "Simple Tennis",
    originalLanguage: "Javascript",
    originalYear: "2017",
    image: tennisPreview,
    component: lazy(() => import("./simpleTennis/SimpleTennis")),
    author: "Scott Brown"
  },
  {
    name: "lightOn",
    title: "Light On",
    originalFramework: "Swing",
    originalLanguage: "Java",
    originalYear: "2005",
    image: lightOnPreview,
    component: LightOn,
    author: "Scott Brown"
  },
  {
    name: "prisonBreak",
    title: "Prison Break",
    desc: "Year: 2007. Original language: C++",
    originalLanguage: "C++",
    originalYear: "2007",
    image: prisonBreakPreview,
    component: lazy(() => import("./prisonBreak/PrisonBreak")),
    author: "Scott Brown"
  },
  {
    name: "guesser",
    title: "Guess the number",
    originalFramework: "TI-86 Calculator",
    originalLanguage: "Basic",
    image: GuesserPreview,
    originalYear: "2002",
    component: lazy(() => import("./guesser/Guesser")),
    author: "Scott Brown"
  },
  {
    name: "guesser-ai",
    title: "Guess the number AI",
    originalLanguage: "Javascript",
    image: GuesserAIPreview,
    originalYear: "2018",
    component: lazy(() => import("./guesserAI/GuesserAI")),
    author: "Scott Brown"
  },
  {
    name: "tic",
    title: "Noughts and Crosses",
    originalFramework: "React",
    originalLanguage: "Javascript",
    originalYear: "2016",
    component: lazy(() => import("./tictactoe/Tic")),
    image: ticPreview,
    author: "Scott Brown"
  },
  {
    name: "cgol",
    title: "Conway's Game of Life",
    originalFramework: "React",
    originalLanguage: "Typescript",
    originalYear: "2021",
    component: lazy(() => import("./gameOfLife/GameOfLife")),
    image: gameOfLifePreview,
    author: "Scott Brown"
  },
  {
    name: "balloonGame",
    title: "Balloon Games",
    linkType: "unity",
    originalYear: "2005",
    originalLanguage: "Java",
    remakeLanguage: "C#",
    remakeFramework: "Unity",
    remakeYear: "2024",
    image: balloonGamesPreview,
    author: "Scott Brown"
  }
];
