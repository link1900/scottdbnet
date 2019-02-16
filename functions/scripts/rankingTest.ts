import { runScript } from './scriptHelper';
import logger from '../src/logging/logger';
import { getDatabaseConnection } from '../src/server/serverHelper';
import { createDataLoaders, DataLoaders } from '../src/server/dataLoaders';

async function main() {
  logger.info('running database connection test');
  const connection = await getDatabaseConnection();
  const loaders = await createDataLoaders(connection);
  //     await generateGreyhound(1);
  //     await generateGreyhound(2);
  //     await generateGreyhound(3);
}

async function generateGreyhound(baseId: string, loaders: DataLoaders) {
  // const greyhound = await createGreyhound({}, { name: `greyhound-${baseId}` });
  // const race = await createRace({}, { name: `race-${index}-1`, racedAt: new Date() });
  // const placing = await createPlacing({}, { raceId: race.id, greyhoundId: greyhound.id });
  // await createScoreFromPlacing(placing, 'agra-greyhound', Math.floor((Math.random() * 100) + 1));
  // await createScoreFromPlacing(placing, 'agra-sire', Math.floor((Math.random() * 100) + 1));
  //
  // const race2 = await createRace({ name: `race-${index}-1`, racedAt: new Date() });
  // const placing2 = await createPlacing({ raceId: race2.id, greyhoundId: greyhound.id });
  // await createScoreFromPlacing(placing2, 'agra-greyhound', Math.floor((Math.random() * 100) + 1));
}

runScript(main);
