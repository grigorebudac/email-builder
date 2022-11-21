import { CircularProgress, Flex } from '@lego/klik-ui';
import React from 'react';

const LoadingLayout = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress isIndeterminate={true} />
    </Flex>
  );
};

export default LoadingLayout;
