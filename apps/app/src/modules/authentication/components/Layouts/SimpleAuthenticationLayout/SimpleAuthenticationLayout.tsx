import { Box, Flex, Text } from '@lego/klik-ui';
import React from 'react';

interface SimpleAuthenticationLayoutProps {
  title: string;
}

const SimpleAuthenticationLayout = (
  props: React.PropsWithChildren<SimpleAuthenticationLayoutProps>
) => {
  return (
    <Flex
      flexDirection="column"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="3xl">{props.title}</Text>
      <Box mt="2rem" width="100%" maxWidth={['90%', '36rem']}>
        {props.children}
      </Box>
    </Flex>
  );
};

export default SimpleAuthenticationLayout;
