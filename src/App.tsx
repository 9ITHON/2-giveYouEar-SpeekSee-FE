import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import PracticePage from './pages/Practice/PracticePage';
import styled from 'styled-components';

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
          <Route path="/" element={<MainPage />} />
          <Route path="practice">
            <Route path=":id" element={<PracticePage />} />
          </Route>
        </Routes>
      </Common>
    </AppStyle>
  );
}

export default App;
