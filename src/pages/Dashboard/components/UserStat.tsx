import styled from 'styled-components';

interface UserStatGuageProps {
  $value: number;
}

const UserStatStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserStatName = styled.h3`
  color: #6dabfd;
  font-size: 16px;
  font-weight: 700;
`;

const UserStatGuageBar = styled.div`
  width: 150px;
  height: 15px;
  background: #e9f2ff;
  border-radius: 10px;
  position: relative;
`;

const UserStatGuage = styled.div<UserStatGuageProps>`
  background: #6dabfd;
  width: ${props => props.$value * 1.5}px;
  height: 15px;
  border-radius: 10px;
  position: absolute;
`;

const UserStat = ({ name, value }: { name: string; value: number }) => {
  return (
    <UserStatStyle>
      <UserStatName>{name}</UserStatName>

      <UserStatGuageBar>
        <UserStatGuage $value={value} />
      </UserStatGuageBar>
    </UserStatStyle>
  );
};

export default UserStat;
