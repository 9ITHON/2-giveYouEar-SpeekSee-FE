import React from 'react';
import styled from 'styled-components';

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
  font-weight: 500;
`;

const Required = styled.span`
  color: #7daaff;
  margin-left: 2px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 8px;
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
  margin-top: 18px;
`;

const Signup: React.FC = () => (
  <Container>
    <Title>로고 & 어플명</Title>
    <Label htmlFor="nickname">
      닉네임<Required>*</Required>
    </Label>
    <Input id="nickname" placeholder="닉네임을 입력해주세요." />

    <Label htmlFor="userid">
      아이디<Required>*</Required>
    </Label>
    <Input id="userid" placeholder="아이디를 입력해주세요." />

    <Label htmlFor="pw">
      비밀번호<Required>*</Required>
    </Label>
    <Input id="pw" type="password" placeholder="비밀번호를 입력해주세요." />

    <Label htmlFor="pwcheck">
      비밀번호 확인<Required>*</Required>
    </Label>
    <Input id="pwcheck" type="password" placeholder="비밀번호를 입력해주세요." />

    <Label htmlFor="birth">
      생년월일
    </Label>
    <Input id="birth" placeholder="생년월일을 적어주세요. "/>

    <Button>회원가입</Button>
  </Container>
);

export default Signup;