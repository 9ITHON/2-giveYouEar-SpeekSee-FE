import { useEffect } from 'react';
import mainApi from '../../apis/mainApi';


const Redirect1 = ( { provider }: {provider: string}) => {
  useEffect(() => {
    const init = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      try{
        const res = await mainApi.post('/api/auth/oauth/login', {
        code: code,
        provider: "GOOGLE",
      });
      const { accessToken, refreshToken } = res.data;
      
      localStorage.setItem('accessToken',accessToken);
      localStorage.setItem('refreshToken',refreshToken);
      window.location.href='/googlelogin';

      }catch(error){
        console.error('로그인 에러:', error);
      }
    };
    init();
  }, []);

  return <div>로그인 처리 중...</div>;

};

export default Redirect1;
