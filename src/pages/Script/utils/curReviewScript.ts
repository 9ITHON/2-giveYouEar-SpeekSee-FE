import type { MappedResult } from '../types/MappedResult';
interface Reviews {
  id: number;
  transcript: string;
  accuracy: number;
  scriptId: number;
  words: MappedResult[];
}

const curReviewScript = (scriptId: number, reviews: Reviews[], expectedScript: string[]) => {
  const isVisited: boolean[] = new Array(expectedScript.length).fill(false);
  const latestReview = reviews.filter(review => review.scriptId === scriptId).pop();
  if (latestReview) {
    console.log(latestReview.words);
    let idx = 0;
    latestReview.words.forEach((word: MappedResult) => {
      if (word.word && word.startTime) {
        isVisited[idx++] = word.correct;
      }
    });
  } else {
    console.log('해당 scriptId에 대한 리뷰를 찾을 수 없습니다.');
    return null;
  }
  console.log(isVisited);
  return isVisited;
};

export default curReviewScript;
