import { callGraphql } from '../../server/__tests__/testHelpers';
import { gql } from 'apollo-server-core';

describe('applicationConfigType tests', () => {
  it('return query application config correctly', async () => {
    const query = gql`
      query {
        applicationConfig {
          name
        }
      }
    `;
    const vars = {};
    const result = await callGraphql(query, vars);
    const { data } = result;
    expect(data && data.applicationConfig.name).toEqual('Scott DB');
  });
});
