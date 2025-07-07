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
  const mainRoutes: Record<string, Record<string, string>> = {
    '/': {
      nav: 'home',
    },
    '/study': {
      nav: 'study',
      pagename: "학습"
    },
    '/script': {
      nav: 'home',
    },
    "/attendance": {
      nav: 'home',
      pagename: "출석체크"
    },
    '/review': {
      nav: 'review',
      pagename: '복습 훈련',
    },
    '/ranking': { nav: 'ranking', pagename: '순위' },
    '/settings': { nav: 'settings', pagename: '설정' },
    '/dashboard': { nav: 'settings', pagename: '대시보드' },
  };
  return (
    <MainLayoutStyle>
      <Header />
      {mainRoutes[path.pathname]['pagename'] && (
        <PageName>{mainRoutes[path.pathname]['pagename']}</PageName>
      )}
      <Outlet />
      <Footer mainRoutes={mainRoutes} />
    </MainLayoutStyle>
  );
};

export default Main;
