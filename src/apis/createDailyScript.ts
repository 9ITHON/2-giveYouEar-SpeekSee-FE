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
      title,
      content,
      category,
      difficultyLevel,
      isLevelTest: false,
    },
  ];
  return mainApi.post('/api/scripts/batch', payload, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  });
};

export default createDailyScript;
