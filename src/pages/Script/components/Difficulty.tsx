import { useCallback } from 'react';
import styled from 'styled-components';
import createDailyScript from '../../../apis/createDailyScript';
import { useNavigate } from 'react-router-dom';

const DifficultyStyle = styled.div`
  display: flex;
  color: #6dabfd;
  font-size: 12px;
  font-weight: 300;
`;

const DifficultButton = styled.span`
  margin: 0 3px;
  color: #6dabfd;
  font-size: 12px;
  font-weight: 400;
  &:first-child {
    margin-left: 0;
  }
`;

const Difficulty = ({
  category,
  isLoading,
  setIsLoading,
}: {
  category: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const goToThePractice = useCallback(async (category: string, difficulty: string) => {
    try {
      setIsLoading(prev => !prev);
      const response = await createDailyScript(category, difficulty);
      if (response) {
        const data = response.data.data;
        setIsLoading(prev => !prev);
        navigate(`/script/${data.id}`, {
          state: {
            id: data.id,
            content: data.content,
          },
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(prev => !prev);
    }
  }, []);
  return (
    <DifficultyStyle>
      <DifficultButton
        onClick={() => {
          if (isLoading) return;
          goToThePractice(category, 'HARD');
        }}
      >
        상
      </DifficultButton>{' '}
      /
      <DifficultButton
        onClick={() => {
          if (isLoading) return;
          goToThePractice(category, 'MEDIUM');
        }}
      >
        중{' '}
      </DifficultButton>{' '}
      /
      <DifficultButton
        onClick={() => {
          if (isLoading) return;
          goToThePractice(category, 'EASY');
        }}
      >
        하
      </DifficultButton>
    </DifficultyStyle>
  );
};

export default Difficulty;
