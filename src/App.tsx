import { Route, Routes } from 'react-router-dom';
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

const AppStyle = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Common = styled.div`
  width: 39em;
  height: 84.4em;
`;

function App() {
  return (
    <AppStyle>
      <Common>
        <Routes>
          <Route index path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="test" element={<Test />} />
          <Route path="review" element={<Review />} />
          <Route path="script">
            <Route path="select" element={<Select />} />
            <Route path="practice/:session_id/:script_id" element={<Practice />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </Common>
    </AppStyle>
  );
}

export default App;
