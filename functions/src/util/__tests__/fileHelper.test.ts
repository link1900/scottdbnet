import { readFileFromDisk, writeFileToDisk } from '../fileHelper';
import path from 'path';
import fs from 'fs';

describe('fileHelper', () => {
  const readFilePath = path.join(__dirname, 'readTestFile.txt');
  const writeFilePath = path.join(__dirname, 'writeTestFile.txt');

  afterAll(() => {
    fs.unlinkSync(writeFilePath);
  });

  describe('#readFileFromDisk', () => {
    it('reads the file correctly', async () => {
      const contents = await readFileFromDisk(readFilePath);
      expect(contents).toEqual('read test file contents\n');
    });

    it('throws an exception when file cannot be read', async () => {
      try {
        await readFileFromDisk('no');
        expect(true).toEqual(false);
      } catch (e) {
        expect(e.message).toContain('ENOENT');
      }
    });
  });

  describe('#writeFileToDisk', () => {
    it('write the file correctly', async () => {
      const result = await writeFileToDisk(writeFilePath, 'write test file contents');
      expect(result).toBeTruthy();
      const contents = await readFileFromDisk(writeFilePath);
      expect(contents).toEqual('write test file contents');
    });

    it('throws an exception when file cannot be written', async () => {
      try {
        // @ts-ignore
        await writeFileToDisk(5, 5);
        expect(true).toEqual(false);
      } catch (e) {
        expect(e.message).toContain('EBADF');
      }
    });
  });
});
