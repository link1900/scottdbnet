import { getViewerFromAuth } from '../authHelper';

it('gets a viewer', () => {
  expect(
    getViewerFromAuth({
      isLoaded: true,
      isEmpty: false,
      uid: '123',
      displayName: 'scott',
      email: 'anon@scottdb.net',
      photoURL: 'https//images.scottdb.net/image1'
    })
  ).toMatchSnapshot();
});
