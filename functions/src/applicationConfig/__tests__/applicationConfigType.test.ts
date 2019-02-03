import { callGraphql } from '../../testing/testHelper';
import { gql } from '../../graphql/graphqlTools';

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
