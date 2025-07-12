import mainApi from './mainApi';
import type { Category } from './types/Catogory';
import type { DifficultyLevel } from './types/DifficultyLevel';
import type { ScriptItem } from './types/ScriptItem';

const createDailyScript = (
  title: string,
  content: string,
  category: Category,
  difficultyLevel: DifficultyLevel,
) => {
  const payload: ScriptItem[] = [
    {
      title: '자기소개 연습용',
      content: '안녕하세요, 저는 박종호입니다',
      category: 'SELF_INTRODUCTION',
      difficultyLevel: 'MEDIUM',
      isLevelTest: false,
    },
  ];
  return mainApi.post(
    '/api/scripts/batch',
    {
      payload,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    },
  );
};

export default createDailyScript;
