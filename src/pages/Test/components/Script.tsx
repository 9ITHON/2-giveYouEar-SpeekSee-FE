import { useOutletContext } from 'react-router-dom';
import type { TestContext } from '../types/TestContext';
import Content from './Content';

const Script = () => {
  const { status, script } = useOutletContext<TestContext>();
  return <Content $status={status}>{script}</Content>;
};

export default Script;
