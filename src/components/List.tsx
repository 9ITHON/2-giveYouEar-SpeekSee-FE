import styled from 'styled-components';

const ListStyle = styled.div`
  margin-bottom: 12px;
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
  font-weight: 500;
  margin-bottom: 12px;
`;

const ListDetail = styled.span`
  display: block;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 16rem;
`;

const List = ({ title, description, detail }) => {
  return (
    <ListStyle>
      <ListTitle>{title}</ListTitle>
      <ListDescription>{description}</ListDescription>
      <ListDetail>{detail}</ListDetail>
    </ListStyle>
  );
};

export default List;
