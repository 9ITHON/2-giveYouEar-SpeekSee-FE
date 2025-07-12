import styled from 'styled-components';
import List from '../../components/List';
import logout from '../../apis/logout';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import getUserInfo from '../../apis/getUserInfo';
import Profile from './components/Profile';

const SettingsStyle = styled.div``;

const Wrapper = styled.div`
  padding: 0 24px;
  margin-top: 12px;
`;

const Button = styled.button`
  font-size: 12px;
  color: #6dabfd;
`;

const Settings = () => {
  const [userData, setUserData] = useState<Record<string, string | number>>();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfoData = async () => {
      try {
        const response = await getUserInfo();
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfoData();
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();
      if (response.status) {
        navigate('/login');
      }
    } catch (error) {
      console.log(console.log(error));
    }
  }, []);

  return (
    <SettingsStyle>
      <Wrapper>
        <Profile
          nickname={userData?.nickname !== undefined ? String(userData.nickname) : undefined}
          birthday={userData?.birthday !== undefined ? String(userData.birthday) : undefined}
          currentLevel={
            userData?.currentLevel !== undefined ? String(userData.currentLevel) : undefined
          }
        />
        <List
          title="로그아웃"
          description="현재 로그인 된 계정을 로그아웃 합니다."
          detailOne={<div></div>}
          detailTwo={
            <Button
              onClick={() => {
                handleLogout();
              }}
            >
              확인
            </Button>
          }
        />
      </Wrapper>
    </SettingsStyle>
  );
};
export default Settings;
