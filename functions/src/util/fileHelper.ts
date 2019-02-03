import fs, { WriteFileOptions } from 'fs';

export function readFileFromDisk(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
}

export function writeFileToDisk(path: string, data: string, options: WriteFileOptions = {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
