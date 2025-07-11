import React, {useState} from 'react';
import styled from 'styled-components';
import mainApi from '../../apis/mainApi';



const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  height:800px ;
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
  width: 90%;
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





const Signup: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
    passwordCheck: '',
    birthday:'',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // 회원가입 API 호출 함수
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const res = await mainApi.post('/api/auth/signup', {
        email: form.email,
        password: form.password,
        nickname: form.nickname,
        birthday: form.birthday,
      });
      if (res.data.success) {
        alert(res.data.message); // "회원가입이 완료되었습니다" 
        window.location.href = '/login';
      } else {
        alert(res.data.error?.message || '회원가입 실패');
      }
    } catch (err: any) {
      alert('네트워크 오류');
    }
  };

  return (
    <Container>
      <Title>로고 & 어플명</Title>
      <form onSubmit={handleSignup}>
        <Label htmlFor="nickname">
          닉네임<Required>*</Required>
        </Label>
        <Input id="nickname" value={form.nickname} onChange={handleChange} placeholder="이름을 입력해주세요." />
        <Label htmlFor="birthday">
          생년월일<Required>*</Required>
        </Label>
        <Input id="birthday" value={form.birthday} onChange={handleChange} placeholder="생년월일을 입력해주세요."></Input>
        
        <Label htmlFor="email">
          이메일<Required>*</Required>
        </Label>
        <Input id="email" value={form.email} onChange={handleChange} placeholder="이메일을 입력해주세요." />

        <Label htmlFor="password">
          비밀번호<Required>*</Required>
        </Label>
        <Input id="password" type="password" value={form.password} onChange={handleChange} placeholder="비밀번호를 입력해주세요." />

        <Label htmlFor="passwordCheck">
          비밀번호 확인<Required>*</Required>
        </Label>
        <Input id="passwordCheck" type="password" value={form.passwordCheck} onChange={handleChange} placeholder="비밀번호를 다시 입력해주세요." />

        <Button type="submit">회원가입</Button>
      </form>
    </Container>
  );
};

export default Signup;