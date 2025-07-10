import styled from 'styled-components';
import Title from '../../../components/Title';

const ProfileNickname = styled(Title)`
  font-size: 20px;
`;

const ProfileStyle = styled.div`
  border: 1px solid #81b7ff;
  border-radius: 8px;
  padding: 24px 16px;
  margin-bottom: 12px;
`;

const More = styled.span`
  display: block;
  color: #6dabfd;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Profile = ({
  nickname,
  birthday,
  currentLevel,
}: {
  nickname: string | undefined;
  birthday: string | undefined;
  currentLevel: string | undefined;
}) => {
  const birthdayInfo = birthday?.split('-');
  return (
    <ProfileStyle>
      <ProfileNickname>{nickname || '로딩 중'}</ProfileNickname>
      <More>
        생년월일:{' '}
        {birthdayInfo !== undefined
          ? `${birthdayInfo[0]}년 ${birthdayInfo[1]}월 ${birthdayInfo[2]}일`
          : '로딩 중'}
      </More>
      <More>등급: {currentLevel || '로딩 중'}</More>
    </ProfileStyle>
  );
};

export default Profile;
