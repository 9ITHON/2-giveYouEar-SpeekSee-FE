
import { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    // code를 백엔드로 전송해서 토큰 발급 요청
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default Redirect;