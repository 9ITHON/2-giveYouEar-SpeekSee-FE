import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  background: #eaf2ff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  height: 800px;
`;

const Title = styled.div`
  background: #ddd;
  height: 100px;
  margin-bottom: 150px;
  margin-top : 100px;
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
  margin-bottom: 10px;
  margin-top: 10px;
  display: block;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 25px;
  padding: 14px;
  border: 1.5px solid #bcd;
  border-radius: 6px;
  font-size: 16px;
  background: #f7faff;
`;

const Button = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  background: #7daaff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 12px;
`;




const KakaoLogin = () => {
  const [nickname, setNickname] = useState('');

  
  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`닉네임: ${nickname}`);
  };

  return (

      <Container>
        <Title>로고 & 어플명</Title>
        <form onSubmit={handleStart}>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
          <Button type="button"  onClick={()=> window.location.href ='/'}>(어플명) 시작하기</Button>
        </form>
      </Container>

  );
};

export default KakaoLogin;