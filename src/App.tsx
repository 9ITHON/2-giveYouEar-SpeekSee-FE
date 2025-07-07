import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
import Practice from './pages/Script/Practice';
import styled from 'styled-components';
import Test from './pages/Test/Test';
import Review from './pages/Study/Review';
import Mypage from './pages/Mypage/Mypage';
import Dashboard from './pages/Dashboard/Dashboard';
import Select from './pages/Script/Select';
import Main from './layout/Main';
import Attendance from './pages/Attendance/Attendance';

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
            <Route path="/attendance" element={<Attendance />} />
            <Route path="review" element={<Review />} />
            <Route path="script" element={<Select />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Mypage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="test" element={<Test />} />
          <Route path="script/practice/:session_id/:script_id" element={<Practice />} />
        </Routes>
      </Common>
    </AppStyle>
  );
}

export default App;
