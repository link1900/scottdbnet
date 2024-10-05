import { Injectable } from "@nestjs/common";
import { CounterRepository } from "./counter.repository";
import { CreateCounterDto } from "./dto/create-counter.dto";
import { UpdateCounterDto } from "./dto/update-counter.dto";

@Injectable()
export class CounterService {
  constructor(private counterRepository: CounterRepository) {}

  create(createCounterDto: CreateCounterDto) {
    return this.counterRepository.createCounter(createCounterDto);
  }

  findAll() {
    return this.counterRepository.counters({
      take: 50,
      orderBy: { value: "desc" },
    });
  }

  findOne(id: number) {
    return this.counterRepository.counter({ id });
  }

  update(id: number, updateCounterDto: UpdateCounterDto) {
    return this.counterRepository.updateCounter({
      where: { id },
      data: updateCounterDto,
    });
  }

  remove(id: number) {
    return this.counterRepository.deleteCounter({ id });
  }
}
