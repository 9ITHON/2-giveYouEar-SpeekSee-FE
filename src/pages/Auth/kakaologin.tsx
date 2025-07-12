import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/png/logo.png';
import mainApi from '../../apis/mainApi';

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  background: #eaf2ff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: 800px;
`;

const Title = styled.div`
  height: 100px;
  margin-bottom: 150px;
  margin-top: 100px;
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
const KakaoLogin : React.FC= () =>{
  const [form, setForm] = useState({
    nickname: '',
    birthdate:'',
  });
  const [isLoading, setIsLoading]= useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleKakaoLogin = async ( e :  React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try{
        const res = await mainApi.post('/api/users/me/additional-info',{
          nickname: form.nickname,
          birthdate: form.birthdate,
        });
        if( res.data.success && res.data.data){
          localStorage.setItem('accessToken', res.data.data.accessToken);
          localStorage.setItem('refreshToken', res.data.data.refreshToken);
          alert('성공');
          window.location.href='/';
        }else{
          alert(res.data.message ||'실패');
        }
      } catch(err){
        alert('네트워크 오류');
      } finally{
        setIsLoading(false);
      }
    };
     return (
    <Container>
      <Title>
      <img src={logo} alt="로고" style={{ height: 60, marginRight: 12 }} />
      </Title>
      <form onSubmit={handleKakaoLogin}>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요."
        />
        <Label htmlFor="birthday">
          생년월일
        </Label>
        <Input
          id="birthdate"
          value={form.birthdate}
          onChange={handleChange}
          placeholder="생년월일을 입력해주세요."
        ></Input>
        <Button type="button" onClick={() => (window.location.href = '/')}>
          (어플명) 시작하기
        </Button>
      </form>
    </Container>
  );
  
}



export default KakaoLogin;
