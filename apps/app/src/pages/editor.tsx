import dynamic from 'next/dynamic';

export default dynamic(() => import('@/modules/builder/pages/Builder'), {
  ssr: false,
});
