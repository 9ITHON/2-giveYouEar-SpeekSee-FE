import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import Result from './Result';
import React from 'react';
import RedText from './RedText';
import BlueText from './BlueText';
import SkyblueText from './SkyblueText';

interface ScriptContentProps {
  $status: number;
  $hasSpan?: boolean; // span 포함 여부
}

const ScriptSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9f2ff;
  width: 100%;
  height: 60em;
`;

const ScriptSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PracticeDescription = styled.div`
  margin-top: 3rem;
  color: #6dabfd;
  font-size: 16px;
  font-weight: 700;
`;

const ScriptContent = styled.div<ScriptContentProps>`
  display: block;
  justify-content: ${props => (props.$hasSpan ? 'unset' : 'center')};
  align-items: ${props => (props.$hasSpan ? 'unset' : 'center')};
  width: 300px;
  height: ${props => (props.$status >= 4 ? 100 : 300)}px;
  text-align: center;
  top: 330px;
  color: #a2caff;
  font-size: 16px;
  white-space: normal; /* 연속된 공백은 무시하고, 일반적인 단어 단위 래핑 */
  overflow-wrap: break-word; /* 단어 중간이라도 줄 바꿈 허용 */
  word-break: 'keep-all';
  line-height: 1.1em;
  overflow-y: auto;
  position: absolute;
  /* span 사이 spacing */
  & > span + span {
    margin-left: 0.25em;
  }
`;

function hasSpanElement(node: React.ReactNode): boolean {
  let found = false;
  React.Children.forEach(node, child => {
    if (!React.isValidElement(child)) return;
    // 1) 진짜 <span> 태그
    if (child.type === 'span') {
      found = true;
    }
    // 2) styled-components 로 만든 RedText / BlueText
    if (child.type === RedText || child.type === BlueText || child.type === SkyblueText) {
      found = true;
    }
    // 3) 중첩 자식도 재귀 검사
    if ((child.props as any)?.children && !found) {
      found = hasSpanElement((child.props as any).children) || found;
    }
  });
  return found;
}

const ReviewDescription = styled.h3`
  margin-top: 7px;
  color: #6dabfd;
  font-size: 12px;
  font-weight: 700;
`;

const ScriptSection = ({
  status,
  accuracy,
  correctCount,
  totalCount,
  step,
  totalStep,
  script,
  path,
}: {
  status: number;
  accuracy: number;
  correctCount: number;
  totalCount: number;
  step: number;
  totalStep: number;
  script: React.ReactNode;
  path: string;
}) => {
  return (
    <ScriptSectionStyle>
      <ProgressBar step={step} totalStep={totalStep} />
      <PracticeDescription>
        {status === 4
          ? '이번 문제의 결과를 확인하세요!'
          : status === 5
          ? '문제를 다 풀었어요! 결과를 확인해 보세요!'
          : '버튼을 누른 뒤 아래 문장을 읽어주세요.'}
      </PracticeDescription>
      {path === 'review' && (
        <ReviewDescription>(강조된 부분을 유의하며 읽어주세요!)</ReviewDescription>
      )}
      <ScriptSectionWrapper>
        {(status !== 5) && (
          <ScriptContent $status={status} $hasSpan={hasSpanElement(script)}>
            {script ? script : '준비 중...'}
          </ScriptContent>
        )}
        {status >= 4 && (
          <Result accuracy={accuracy} correctCount={correctCount} totalCount={totalCount} />
        )}
      </ScriptSectionWrapper>
    </ScriptSectionStyle>
  );
};

export default ScriptSection;
