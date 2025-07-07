import styled from 'styled-components';

const HeaderStyle = styled.header`
  width: 39em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 54px 24px 0 24px;
  position: fixed;
  top: 0px;
  // background: #ffffff;
  @media (max-width: 390px) {
    width: 100vw;
  }
`;

const Points = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const PointsLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #81b7ff;
  border-radius: 25px;
  width: 28px;
  height: 28px;
  background: white;
  color: #81b7ff;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  left: -5px;
`;

const UserPoints = styled.div`
  width: 72px;
  border: 1px solid #81b7ff;
  border-radius: 14px;
  padding: 5px 3px;
  color: #81b7ff;
  font-size: 12px;
  font-weight: 700;
  text-align: right;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <div style={{ width: '84px', height: '42px', background: '#d9d9d9' }}></div>
      <Points>
        <PointsLogo>P</PointsLogo>
        <UserPoints>33,550</UserPoints>
      </Points>
    </HeaderStyle>
  );
};

export default Header;
