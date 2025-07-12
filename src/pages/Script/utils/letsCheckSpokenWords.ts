import type { MappedResult } from '../types/MappedResult';

export const letsCheckSpokenWords = (
  responseWords: MappedResult[],
  scriptWords: string[],
): MappedResult[] => {
  const result: MappedResult[] = Array(scriptWords.length).fill({});
  const idxToWords: Record<number, string> = {};
  const isVisited: boolean[] = Array(scriptWords.length).fill(false);
  const tmp: MappedResult[] = [];
  scriptWords.forEach((word: string, index: number) => {
    idxToWords[index] = word;
  });
  let idx = 0;
  responseWords.forEach((word: MappedResult) => {
    if (word.expected) {
      word.expected = idx++;
      if (idx == scriptWords.length) idx = 0;
    }
  });
  responseWords.forEach((wordData: MappedResult) => {
    if (wordData.correct) {
      result[Number(wordData.expected)] = {
        word: wordData.word,
        expected: idxToWords[Number(wordData.expected)],
        startTime: wordData.startTime,
        endTime: wordData.endTime,
        correct: wordData.correct,
        timeDiff: wordData.endTime - wordData.startTime,
      };
      isVisited[Number(wordData.expected)] = true;
    } else if (wordData.word && wordData.expected === '') {
      tmp.push(wordData);
    } else {
      if (tmp.length && !isVisited[Number(wordData.expected)]) {
        const good = tmp.shift();
        if (good) {
          result[Number(wordData.expected)] = {
            word: good.word,
            expected: idxToWords[Number(wordData.expected)],
            startTime: good.startTime,
            endTime: good.endTime,
            correct: false,
            timeDiff: good.endTime - good.startTime,
          };
          isVisited[Number(wordData.expected)] = true;
        }
      }
    }
  });
  isVisited.forEach((flag: boolean, index: number) => {
    if (!flag) {
      result[index] = {
        word: '',
        expected: idxToWords[index],
        startTime: -1,
        endTime: -1,
        correct: false,
        timeDiff: 0
      }
    }
  })
  return result;
};
