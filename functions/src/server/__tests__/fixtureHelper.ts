import ServerContext from '../ServerContext';
import { Greyhound } from '../../ranker/greyhound/Greyhound';
import moment from 'moment-timezone';

export async function createFixture(context: ServerContext) {
  const sire1 = await context.loaders.greyhound.create(
    new Greyhound({
      name: 'SIRE',
      color: 'black',
      gender: 'dog',
      dateOfBirth: moment()
        .subtract(3, 'years')
        .toDate()
    })
  );
  const dam1 = await context.loaders.greyhound.create(
    new Greyhound({
      name: 'DAM',
      color: 'black',
      gender: 'bitch',
      dateOfBirth: moment()
        .subtract(3, 'years')
        .toDate()
    })
  );
  const greyhound1 = await context.loaders.greyhound.create(
    new Greyhound({
      name: 'EXISTING GREYHOUND',
      sireId: sire1.id,
      damId: dam1.id,
      color: 'black',
      gender: 'dog',
      dateOfBirth: moment()
        .subtract(3, 'years')
        .toDate()
    })
  );

  return {
    unusedId: '513c7ec0-fc27-436f-92f1-b5cf35aa9957',
    unusedNodeId: 'Unused:513c7ec0-fc27-436f-92f1-b5cf35aa9957',
    greyhound1,
    sire1,
    dam1
  };
}

describe('fixtureHelper', () => {
  it('#createFixture', async () => {
    expect(true).toBeTruthy();
  });
});
