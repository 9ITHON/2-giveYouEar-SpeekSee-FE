import type { Category } from './Catogory';
import type { DifficultyLevel } from './DifficultyLevel';

export interface ScriptItem {
  title: string;
  content: string;
  category: Category;
  difficultyLevel: DifficultyLevel;
  isLevelTest: boolean;
}
