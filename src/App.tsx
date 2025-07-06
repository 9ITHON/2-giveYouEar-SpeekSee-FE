import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
import Practice from './pages/Script/Practice';
import styled from 'styled-components';
import Test from './pages/Test/Test';
import Review from './pages/Review/Review';
import Mypage from './pages/Mypage/Mypage';
import Dashboard from './pages/Dashboard/Dashboard';
import Select from './pages/Script/Select';
import Main from './layout/Main';

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
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<Main />}>
            <Route path="home" element={<Home />} />
            <Route path="mypage" element={<Mypage />} />
            <Route path="test" element={<Test />} />
            <Route path="review" element={<Review />} />
            <Route path="script">
              <Route index path="select" element={<Select />} />
            </Route>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="script/practice/:session_id/:script_id" element={<Practice />} />
        </Routes>
      </Common>
    </AppStyle>
  );
}

export default App;
