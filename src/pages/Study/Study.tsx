import styled from 'styled-components';
import List from '../../components/List';
import { useNavigate } from 'react-router-dom';

const StudyStyle = styled.div`
  margin-top: 18px;
  padding: 0 24px;
`;

const Study = () => {
  const navigate = useNavigate();
  return (
    <StudyStyle>
      <List
        title={'가나다'}
        description={'잰말놀이'}
        detailOne={'간장 공장 공장장은 강 공장장이고 된장 공장'}
        active={true}
      />
      <List
        title={'단어'}
        description={'자기소개'}
        detailOne={'안녕하십니까? 저는 산책하는 강아지랍니다. 멍멍'}
        active={false}
      />
      <List
        title={'문장'}
        description={'뉴스'}
        detailOne={'2024년 12월 말, 선행을 베푼 한 대학생'}
        active={false}
      />
      <List
        title={'복습 노트'}
        description={'틀린 문제, 반복하고 싶은 문장'}
        detailOne={'2024년 12월 말, 선행을 베푼 한 대학생'}
        active={true}
        onClick={() => {
          navigate('/study/review');
        }}
      />
    </StudyStyle>
  );
};

export default Study;
