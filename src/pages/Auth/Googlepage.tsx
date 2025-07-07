import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  background: #eaf2ff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  min-height: 90vh;
`;

const Title = styled.div`
  background: #ddd;
  height: 100px;
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 28px;
  border-radius: 8px;
`;

const Label = styled.label`
  font-size: 15px;
  color: #7daaff;
  margin-bottom: 4px;
  margin-top: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 16px;
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
  margin-top: 10px;
`;

const GoogleAfterRegister: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');

  const handleStart = () => {
    // 여기에 회원가입 완료 처리 로직 추가
    alert(`${nickname}님 환영합니다!`);
  };

  return (
    <Container>
      <Title>로고 & 어플명</Title>
      <Label htmlFor="nickname">닉네임</Label>
      <Input
        id="nickname"
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
      <Label htmlFor="birth">생년월일</Label>
      <Input
        id="birth"
        placeholder="생년월일을 입력해주세요."
        value={birth}
        onChange={e => setBirth(e.target.value)}
      />
      <Button onClick={handleStart} disabled={!nickname}>[{nickname || '이름'}] 시작하기</Button>
    </Container>
  );
};

export default GoogleAfterRegister; 