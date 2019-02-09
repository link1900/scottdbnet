import { runTypeTest } from './typeTestHelper';
import { dateTimeDefinition, dateTimeResolver } from '../dateTimeType';
import moment from 'moment-timezone';

describe('date time type tests', () => {
  const baseDate = new Date(2019, 5, 3);
  const momentDate = moment(baseDate);
  const baseDateString = baseDate.toISOString();

  runTypeTest({
    name: 'DateTime',
    typeDefinition: dateTimeDefinition,
    typeResolver: dateTimeResolver,
    queryResult: baseDate,
    mutationResult: baseDate,
    inputTests: [
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: baseDate,
        expected: baseDateString
      },
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: baseDate,
        expected: baseDateString,
        queryResultOverride: momentDate
      },
      {
        valid: true,
        queryType: 'Query',
        inputType: 'JSON',
        input: baseDate,
        expected: baseDateString,
        queryResultOverride: baseDate.toISOString()
      },
      {
        valid: false,
        queryType: 'Query',
        inputType: 'JSON',
        input: baseDate,
        expected: null,
        queryResultOverride: 'bad'
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: baseDateString,
        expected: baseDateString
      },
      {
        valid: true,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: `"${baseDateString}"`,
        expected: baseDateString
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'JSON',
        input: 'nope',
        expected: 'nope'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: '"nope"',
        expected: 'nope'
      },
      {
        valid: false,
        queryType: 'Mutation',
        inputType: 'Literal',
        input: 'nope',
        expected: 'nope'
      }
    ]
  });
});
