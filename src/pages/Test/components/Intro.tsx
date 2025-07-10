import { useNavigate, useOutletContext } from 'react-router-dom';
import type { TestContext } from '../types/TestContext';
import Content from './Content';

const Intro = () => {
  const { status, introStatus, setIntroStatus, problemNo } = useOutletContext<TestContext>();
  const navigate = useNavigate();
  return (
    <Content
      $status={status}
      onClick={() => {
        if (introStatus === -1) return;
        if (introStatus === 2) {
          setIntroStatus(-1);
          navigate(`/test/${problemNo}`);
		  return ;
        }
        setIntroStatus(prev => {
          if (prev === 2) return -1;
          return prev + 1;
        });
      }}
    >
      다음으로 넘어가려면 화면을 터치해주세요!
    </Content>
  );
};

export default Intro;
