import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CounterRepository } from "./counter.repository";
import { CounterService } from "./counter.service";
import { CounterController } from "./counter.controller";

@Module({
  controllers: [CounterController],
  providers: [CounterService, CounterRepository, PrismaService],
})
export class CounterModule {}
