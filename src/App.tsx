import { Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
import Practice from './pages/Script/Practice';
import styled from 'styled-components';
import Test from './pages/Test/Test';
import Review from './pages/Study/Review';
import Settings from './pages/Settings/Settings';
import Dashboard from './pages/Dashboard/Dashboard';
import Category from './pages/Script/Category';
import Main from './layout/Main';
import Attendance from './pages/Attendance/Attendance';
import Study from './pages/Study/Study';
import Ranking from './pages/Ranking/Ranking';
import KakaoLogin from './pages/Auth/kakaologin';
import Redirect from './pages/Auth/Redirect';
import Redirect1 from './pages/Auth/Redirect1';
import  GoogleLogin  from './pages/Auth/googlelogin';
import Splash from './pages/Splash';

const AppStyle = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Common = styled.div`
  width: 39em;
  height: 100%;
`;

function App() {
  return (
    <AppStyle>
      <Common>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="study" element={<Study />}>
              <Route path="review" element={<Review />} />
            </Route>
            <Route path="script" element={<Category />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="test" element={<Test />} />
          <Route path="script/:script_id" element={<Practice />} />
          <Route path="oauth/callback" element={<Redirect1 provider="GOOGLE" />}/>
          <Route path="oauth/callback/kakao"  element={ <Redirect provider="KAKAO"/> } />
          <Route path="kakaologin" element={<KakaoLogin/>}/>
          <Route path="googlelogin" element={<GoogleLogin/>}/>
          <Route path="Splash" element={<Splash/>}/>

        </Routes>
      </Common>
    </AppStyle>
  );
}

export default App;
