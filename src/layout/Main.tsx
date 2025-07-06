import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';

const MainLayoutStyle = styled.div``;

const PageName = styled.h1`
  margin-top: 124px;
  color: #6badfd;
  padding: 0 24px;
  font-size: 24px;
  font-weight: 700;
`;

const Main = () => {
  const path = useLocation();
  const routes: Record<string, string> = {
    '/review': '복습노트',
  };
  return (
    <MainLayoutStyle>
      <Header />
      {routes[path.pathname] && <PageName>{routes[path.pathname]}</PageName>}
      <Outlet />
      <Footer />
    </MainLayoutStyle>
  );
};

export default Main;
