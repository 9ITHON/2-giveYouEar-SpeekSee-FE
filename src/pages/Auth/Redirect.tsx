import { useEffect } from 'react';
import mainApi from '../../apis/mainApi';
import { useNavigate } from 'react-router-dom';


const Redirect = ( { provider }: {provider: string}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      console.log(provider);
      try {
        const res = await mainApi.post('/api/auth/oauth/login', {
          code: code,
          provider: provider,
        });
        const { accessToken, refreshToken } = res.data;
        
        localStorage.setItem('accessToken',accessToken);
        localStorage.setItem('refreshToken',refreshToken);
        
        navigate('/kakaologin');

      }catch(error){
        console.error('로그인 에러:', error);
      }
    };
    init();
  }, []);
console.log(provider);
  return <div>로그인 처리 중...</div>;

};

export default Redirect;
