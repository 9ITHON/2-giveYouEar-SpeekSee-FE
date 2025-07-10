import type React from 'react';

export interface TestContext {
  status: number;
  introStatus: number;
  setIntroStatus: React.Dispatch<React.SetStateAction<number>>;
  script: React.ReactNode;
  problemNo: number;
}
