import styled from 'styled-components';

interface ContentProps {
  $status: number;
}

const Content = styled.div<ContentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: ${props => (props.$status === 4 ? 100 : 300)}px;
  margin-top: 53px;
  text-align: center;
  color: #a2caff;
  font-size: 16px;
  white-space: pre-line;
  line-height: 1.1em;
  overflox-y: auto;
`;

export default Content;
