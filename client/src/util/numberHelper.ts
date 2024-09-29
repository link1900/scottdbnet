import { Sequence } from "./Sequence";

const idSequence = new Sequence();

export function getNumberId(): number {
  return idSequence.getNextNumber();
}
