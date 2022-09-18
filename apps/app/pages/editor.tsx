import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const BuilderContainer = dynamic(
  () => import('../components/Containers/BuilderContainer'),
  { ssr: false }
);

const Editor: NextPage = () => {
  return <BuilderContainer />;
};

export default Editor;
