import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;

const ModalStyle = styled.div`
  border-radius: 16px;
  background: #ffffff;
  color: #6dabfd;
  font-weight: 700;
`;

const ModalQuestion = styled.h1`
  font-size: 24px;
  text-align: center;
  margin: 42px 28px 36px 28px;
`;

const ModalPS = styled.span`
  display: block;
  margin-bottom: 38px;
  font-size: 12px;
  text-align: center;
`;

const ModalButtons = styled.div`
  width: 100%;
`;

const ModalButton = styled.button<{ $type: 'yes' | 'no' }>`
  width: 50%;
  background: ${props => (props.$type === 'yes' ? '#81B7FF' : '#B8D6FF')};
  color: white;
  padding-top: 11px;
  padding-bottom: 8px;
  border-bottom-left-radius: ${props => (props.$type === 'yes' ? 16 : 0)}px;
  border-bottom-right-radius: ${props => (props.$type === 'yes' ? 0 : 16)}px;
`;

const Modal = ({ setIsClosed }: { setIsClosed: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <ModalBackground ref={modalRef}>
      <ModalStyle>
        <ModalQuestion>학습을 중단하시겠습니까?</ModalQuestion>
        <ModalPS>학습 내용과 진도는 저장되지 않습니다.</ModalPS>
        <ModalButtons>
          <ModalButton $type="yes" onClick={() => navigate('/script/select', { replace: true })}>
            네
          </ModalButton>
          <ModalButton
            $type="no"
            onClick={() => {
              if (modalRef.current) {
                modalRef.current.style.display = 'none';
              }
              setIsClosed(prev => !prev);
            }}
          >
            아니오
          </ModalButton>
        </ModalButtons>
      </ModalStyle>
    </ModalBackground>
  );
};

export default Modal;
