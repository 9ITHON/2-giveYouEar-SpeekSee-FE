import { useCallback } from 'react';
import styled from 'styled-components';
import createDailyScript from '../../../apis/createDailyScript';
import { useNavigate } from 'react-router-dom';

const DifficultyStyle = styled.div`
  display: flex;
`;

const Difficulty = ({ category }: { category: string }) => {
  const navigate = useNavigate();
  const goToThePractice = useCallback(async (category: string, difficulty: string) => {
    try {
      console.log(category, difficulty);
      const response = await createDailyScript(category, difficulty);
      if (response) {
        const data = response.data.data;
        console.log(data);
        navigate(`/script/${data.id}`, {
          state: {
            id: data.id,
            content: data.content,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <DifficultyStyle>
      <button
        onClick={() => {
          goToThePractice(category, 'HARD');
        }}
      >
        상
      </button>{' '}
      /
      <button
        onClick={() => {
          goToThePractice(category, 'MEDIUM');
        }}
      >
        중
      </button>{' '}
      /
      <button
        onClick={() => {
          goToThePractice(category, 'EASY');
        }}
      >
        하
      </button>
    </DifficultyStyle>
  );
};

export default Difficulty;
