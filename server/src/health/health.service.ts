import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { writeFile, WriteFileOptions } from "node:fs";
import { join } from "node:path";

@Injectable()
export class HealthService {
  constructor(private readonly configService: ConfigService) {}

  async getHealth() {
    await writeFileToDisk(
      join(this.configService.getOrThrow("DRIVE_PATH"), "example.txt"),
      "ok",
    );
    return { status: "ok" };
  }
}

export async function writeFileToDisk(
  filePath: string,
  data: string,
  options: WriteFileOptions = {},
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    writeFile(filePath, data, options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
