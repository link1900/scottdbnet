import { Injectable } from "@nestjs/common";
import { Counter, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CounterRepository {
  constructor(private prisma: PrismaService) {}

  async counter(
    counterWhereUniqueInput: Prisma.CounterWhereUniqueInput,
  ): Promise<Counter | null> {
    return this.prisma.counter.findUnique({
      where: counterWhereUniqueInput,
    });
  }

  async counters(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CounterWhereUniqueInput;
    where?: Prisma.CounterWhereInput;
    orderBy?: Prisma.CounterOrderByWithRelationInput;
  }): Promise<Counter[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.counter.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCounter(data: Prisma.CounterCreateInput): Promise<Counter> {
    return this.prisma.counter.create({
      data,
    });
  }

  async updateCounter(params: {
    where: Prisma.CounterWhereUniqueInput;
    data: Prisma.CounterUpdateInput;
  }): Promise<Counter> {
    const { where, data } = params;
    return this.prisma.counter.update({
      data,
      where,
    });
  }

  deleteCounter(where: Prisma.CounterWhereUniqueInput): Promise<Counter> {
    return this.prisma.counter.delete({ where });
  }
}
