import { OmitType } from "@nestjs/mapped-types";
import { Counter } from "../entities/counter.entity";

export class CreateCounterDto extends OmitType(Counter, ["id"]) {}
