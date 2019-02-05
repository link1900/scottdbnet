import { argv } from 'yargs';
import moment from 'moment-timezone';
import { loadEnvironmentVariablesFromConfig } from '../src/environment/environmentHelper';

const dateTimezone = 'Australia/Sydney';
const dateFormat = 'YYYY-MMM-DD hh:mm:ss a';

export function runScript(scriptFunction: () => Promise<any>) {
  const startDate = moment();
  console.info(`starting at ${startDate.tz(dateTimezone).format(dateFormat)}`);
  scriptSetup().then(() => {
    scriptFunction()
      .then(() => {
        const finishedDate = moment();
        console.info(
          `finished at ${finishedDate.tz(dateTimezone).format(dateFormat)} taking ${moment
            .duration(finishedDate.diff(startDate))
            .humanize()}`
        );
        process.exit(0);
      })
      .catch(err => {
        const finishedDate = moment();
        console.error('error running script', err);
        console.info(
          `failed at ${finishedDate.tz(dateTimezone).format(dateFormat)} taking ${moment
            .duration(finishedDate.diff(startDate))
            .humanize()}`
        );
        process.exit(1);
      });
  });
}

async function scriptSetup() {
  // @ts-ignore
  process.env.EXECUTION_ENVIRONMENT = argv.env || 'local-dev';
  loadEnvironmentVariablesFromConfig();
}
