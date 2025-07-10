import styled from 'styled-components';
import Title from './Title';

const ListStyle = styled.div`
  margin-bottom: 12px;
  border: 1px solid #81b7ff;
  border-radius: 8px;
  padding: 18px 16px;
  color: #6dabfd;
`;

const ListDescription = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 12px;
`;

const ListDetailOne = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 16rem;
`;

const ListDetailTwo = styled.div``;

const ListDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const List = ({
  title,
  description,
  detailOne,
  detailTwo,
}: {
  title: string;
  description: string;
  detailOne: React.ReactNode;
  detailTwo?: React.ReactNode;
}) => {
  return (
    <ListStyle>
      <Title>{title}</Title>
      <ListDescription>{description}</ListDescription>
      <ListDetail>
        <ListDetailOne>{detailOne}</ListDetailOne>
        <ListDetailTwo>{detailTwo}</ListDetailTwo>
      </ListDetail>
    </ListStyle>
  );
};

export default List;
