import styled from 'styled-components';

const ListStyle = styled.div`
  border: 1px solid #81b7ff;
  border-radius: 8px;
  padding: 18px 16px;
  color: #6dabfd;
`;

const ListTitle = styled.h1`
  color: #6dabfd;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const ListDescription = styled.span`
  display: block;
  font-size: 10px;
  margin-bottom: 12px;
`;

const ListDetail = styled.span`
  display: block;
  font-size: 10px;
`;

const List = () => {
  return (
    <ListStyle>
      <ListTitle>자기소개</ListTitle>
      <ListDescription>자신의 닉네임을 넣어 자기소개를 연습해보세요!</ListDescription>
      <ListDetail>상 / 중 / 하 / @@ / @@</ListDetail>
    </ListStyle>
  );
};

export default List;
