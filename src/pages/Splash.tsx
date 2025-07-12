// src/pages/Splash.tsx
import React from "react";
import styled from "styled-components";
import logoImg from "../assets/png/logo.png";      
import 목 from "../assets/png/목.png";
import 소 from "../assets/png/소.png";
import 리 from "../assets/png/리.png";
import 로 from "../assets/png/로.png";
import 하 from "../assets/png/하.png";
import 나 from "../assets/png/나.png";
import 되 from "../assets/png/되.png";
import 어 from "../assets/png/어.png";
import characterImg from "../assets/png/캐릭터.png"; 

const SplashWrapper = styled.div`
  width: 400px;
  height: 800px;
  background: #eaf2fb;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;  
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 180px;
  margin-bottom: 10px;
`;



const CenterBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Character = styled.img`
  width: 200px;
  z-index: 2;
`;

const Cylinder = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 200px;
  background: #b3d0f7;
  border-top-left-radius: 50% 60px;
  border-top-right-radius: 50% 60px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 1;
`;

const SubtitleRow = styled.div`
  display: flex;
  gap: 2px; // 글자 이미지 사이 간격
  margin-bottom: 20px;
`;

const Splash: React.FC = () => {
  return (
    <SplashWrapper>
      <TopBox>
        <SubtitleRow>
          <img src={목} alt="목" style={{ width: 30 }} />
          <img src={소} alt="소" style={{ width: 30 }} />
          <img src={리} alt="리" style={{ width: 30 }} />
          <img src={로} alt="로" style={{ width: 30 }} />
          <img src={하} alt="하" style={{ width: 30 }} />
          <img src={나} alt="나" style={{ width: 30 }} />
          <img src={되} alt="되" style={{ width: 30 }} />
          <img src={어} alt="어" style={{ width: 30 }} />
        </SubtitleRow>
        <Logo src={logoImg} alt="로고" />
      </TopBox>
      <CenterBox>
        <Character src={characterImg} alt="캐릭터" />
      </CenterBox>
      <Cylinder />
    </SplashWrapper>
  );
};

export default Splash;
