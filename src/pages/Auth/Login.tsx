import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  background: #eaf2ff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Title = styled.div`
  background: #ddd;
  height: 100px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 28px;
  border-radius: 8px;
`;

const Label = styled.label`
  font-size: 15px;
  color: #4a7bdc;
  margin-bottom: 4px;
  margin-top: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 12px;
  border: 1.5px solid #bcd;
  border-radius: 6px;
  font-size: 16px;
  background: #f7faff;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #7daaff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 12px;
`;


const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const FindLink = styled.a`
  color: #7daaff;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 0 18px 0;
  color: #bbb;
  font-size: 14px;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: #c7d6ee;
`;

const OrText = styled.span`
  margin: 0 10px;
  color: #bbb;
`;

const JoinButton = styled(Button)`
  background: #a5c8ff;
  color: #fff;
  margin-bottom: 0;
`;

const Login: React.FC = () => {
  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      await axios.post(
        '/api/auth/login',
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );
      alert('로그인 성공!');
      window.location.href = '/dashboard';
    } catch (error) {
      alert('구글 로그인 실패');
    }
  };

  return (
    <Container>
      <Title>로고 & 어플명</Title>
      <Label htmlFor="id">아이디</Label>
      <Input id="id" placeholder="아이디를 입력해주세요." />
      <Label htmlFor="pw">비밀번호</Label>
      <Input id="pw" type="password" placeholder="비밀번호를 입력해주세요." />
      <Button>로그인</Button>
      <Row>
        <FindLink>아이디 찾기 / 비밀번호 찾기</FindLink>
        <CheckboxLabel>
          <input type="checkbox" style={{ marginRight: 4 }} />
          자동 로그인
        </CheckboxLabel>
      </Row>
      <Divider>
        <Line />
        <OrText>또는</OrText>
        <Line />
      </Divider>
      <JoinButton>회원가입하기</JoinButton>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => alert('구글 로그인 실패')}
      />
    </Container>
  );
};

export default Login;