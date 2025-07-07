import { useCallback } from 'react';
import styled from 'styled-components';
import createDailyScript from '../../../apis/createDailyScript';
import { useNavigate } from 'react-router-dom';

const DifficultyStyle = styled.div`
  display: flex;
`;

const Difficulty = ({ category }: { category: string }) => {
  const navigate = useNavigate();
  const goToThePractice = useCallback(async (difficulty: string, category: string) => {
    try {
      console.log(import.meta.env.VITE_ACCESS_TOKEN);
      const response = await createDailyScript(category, difficulty);
      if (response) {
        console.log(response);
        const data = response.data.data;
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
