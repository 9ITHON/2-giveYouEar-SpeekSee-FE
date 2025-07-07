import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '../assets/png/home.png';
import HomeClickedIcon from '../assets/png/home-clicked.png';
import SettingsIcon from '../assets/png/settings.png';
import SettingsClickedIcon from '../assets/png/settings-clicked.png';
import RankingIcon from '../assets/png/ranking.png';
import RankingClickedIcon from '../assets/png/ranking-clicked.png';
import PracticeIcon from '../assets/png/practice.png';
import PracticeClickedIcon from '../assets/png/practice-clicked.png';

const FooterStyle = styled.nav`
  width: 39em;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 2.8rem;
  position: fixed;
  bottom: 0px;
  @media (max-width: 390px) {
    width: 100vw;
  }
`;

const NavName = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 700;
  margin-top: 3px;
  color: ${props => (props.$isActive ? '#81B7FF' : '#B7D6FF')};
`;

const NavLinkStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '52px',
    textDecoration: 'none',
  };
};

const StyledNavLink = styled(NavLink)`
  color: #b7d6ff;
  text-decoration: none;
  &:hover {
    background: none;
  }
`;

const Footer = ({ mainRoutes }: { mainRoutes: Record<string, Record<string, string>> }) => {
  const location = useLocation();
  const curNav = mainRoutes[location.pathname]['nav'];
  return (
    <FooterStyle>
      <StyledNavLink to="/home" style={NavLinkStyle}>
        <img
          src={curNav === 'home' ? HomeClickedIcon : HomeIcon}
          alt="홈"
          width="34"
          height="34"
          style={{
            display: 'block',
            marginTop: '2px',
          }}
        />
        <NavName $isActive={curNav === 'home'}>홈</NavName>
      </StyledNavLink>
      <StyledNavLink to="/practice" style={NavLinkStyle}>
        <img
          src={curNav === 'review' ? PracticeClickedIcon : PracticeIcon}
          alt="학습"
          width="36"
          height="36"
          style={{
            display: 'block',
            marginLeft: '8px',
          }}
        />
        <NavName $isActive={curNav === 'review'}>학습</NavName>
      </StyledNavLink>
      <StyledNavLink to="/ranking" style={NavLinkStyle}>
        <img
          src={curNav === 'ranking' ? RankingClickedIcon : RankingIcon}
          alt="랭킹"
          width="36"
          height="32"
          style={{
            display: 'block',
            marginTop: '4px',
          }}
        />
        <NavName $isActive={curNav === 'ranking'}>랭킹</NavName>
      </StyledNavLink>
      <StyledNavLink to="/settings" style={NavLinkStyle}>
        <img
          src={curNav === 'settings' ? SettingsClickedIcon : SettingsIcon}
          alt="설정"
          width="40"
          height="40"
        />
        <NavName $isActive={curNav === 'settings'}>설정</NavName>
      </StyledNavLink>
    </FooterStyle>
  );
};

export default Footer;
