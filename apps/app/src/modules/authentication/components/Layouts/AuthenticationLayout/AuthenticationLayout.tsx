import React, { PropsWithChildren } from 'react';
import { Box, Flex, Grid, LEGOLogo, Text } from '@lego/klik-ui';
import Image from 'next/image';

type AuthenticationLayoutProps = {
  title?: string;
  subtitle?: string;
  withLogo?: boolean;
};

const AuthenticationLayout = ({
  title,
  subtitle,
  withLogo,
  children,
}: PropsWithChildren<AuthenticationLayoutProps>) => {
  return (
    <Grid
      height="100vh"
      width="100vw"
      templateColumns={['1fr', 'repeat(2, 1fr)']}
    >
      <Box position={'relative'} display={['none', 'block']}>
        <Image
          src="/logIn.jpeg"
          alt="login-image"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom bottom"
        />
      </Box>

      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        {withLogo && <LEGOLogo boxSize={['70px', '100px']} />}
        {title && (
          <Text
            fontWeight="semibold"
            fontSize={['24px', '36px']}
            marginTop={['25px', '40px']}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text fontSize={['10px', '14px']} marginTop={['0px', '5px']}>
            {subtitle}
          </Text>
        )}

        {children}
      </Flex>
    </Grid>
  );
};

export default AuthenticationLayout;
