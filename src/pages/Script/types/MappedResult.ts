export interface MappedResult {
  word: string;
  expected?: string | number;
  startTime: number;
  endTime: number;
  correct: boolean;
  timeDiff?: number;
}
