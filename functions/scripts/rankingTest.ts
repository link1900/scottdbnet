import { runScript } from './scriptHelper';
import logger from '../src/logging/logger';
import { getDatabaseConnection } from '../src/server/serverHelper';
import { createDataLoaders, DataLoaders } from '../src/server/dataLoaders';
import { Greyhound } from '../src/ranker/greyhound/Greyhound';
import { Race } from '../src/ranker/race/Race';
import ServerContext from '../src/server/ServerContext';
import { Placing } from '../src/ranker/placing/Placing';
import { Score } from '../src/ranker/score/Score';

async function main() {
  logger.info('running database connection test');
  const connection = await getDatabaseConnection();
  const loaders = await createDataLoaders(connection);
  const context = new ServerContext(loaders);

  const g1 = await generateGreyhound(context, 'g1');
  const g2 = await generateGreyhound(context, 'g2');
  const g3 = await generateGreyhound(context, 'g3');

  const r1 = await generateRace(context, 'r1');

  const p1 = await generatePlacing(context, r1, g1, '1');
  const p2 = await generatePlacing(context, r1, g2, '2');
  const p3 = await generatePlacing(context, r1, g3, '3');

  const s1 = await generateScore(context, p1, 10);
  const s2 = await generateScore(context, p2, 8);
  const s3 = await generateScore(context, p3, 5);

  const r2 = await generateRace(context, 'r2');

  const p21 = await generatePlacing(context, r2, g1, '1');
  const p22 = await generatePlacing(context, r2, g2, '2');
  const p23 = await generatePlacing(context, r2, g3, '3');

  const s21 = await generateScore(context, p21, 8);
  const s22 = await generateScore(context, p22, 10);
  const s23 = await generateScore(context, p23, 3);

  // select "greyhoundId", "greyhoundName", points, RANK() OVER(ORDER BY points desc) from (
  //   select public.greyhound.id as "greyhoundId", public.greyhound.name as "greyhoundName", sum(public.score.amount) as points
  // from public.placing, public.greyhound, public.race, public.score
  // where public.placing."greyhoundId" = public.greyhound.id AND public.placing."raceId" = public.race.id AND public.placing.id = public.score."placingId"
  // group by public.greyhound.id, public.greyhound.name
  // order by points desc) as "rankings"
}

async function generateGreyhound(context: ServerContext, name: string) {
  const foundGreyhound = await context.loaders.greyhound.repository.findOne({ name });
  if (foundGreyhound) {
    return foundGreyhound;
  }
  const greyhound = new Greyhound(name);
  return context.loaders.greyhound.create(greyhound);
}

async function generateRace(context: ServerContext, name: string) {
  const foundRace = await context.loaders.race.repository.findOne({ name });
  if (foundRace) {
    return foundRace;
  }
  const race = new Race(name, new Date(), 'group1', 515);
  race.name = name;
  return context.loaders.race.create(race);
}

async function generatePlacing(context: ServerContext, race: Race, greyhound: Greyhound, place: string) {
  const foundPlacing = await context.loaders.placing.repository.findOne({ raceId: race.id, greyhoundId: greyhound.id });
  if (foundPlacing) {
    return foundPlacing;
  }
  const placing = new Placing(place, race.id, greyhound.id);
  return context.loaders.placing.create(placing);
}

async function generateScore(context: ServerContext, placing: Placing, amount: number) {
  const foundScore = await context.loaders.score.repository.findOne({ placingId: placing.id });
  if (foundScore) {
    return foundScore;
  }
  const score = new Score(placing.id, 'main-rankings', amount);
  return context.loaders.score.create(score);
}

runScript(main);
