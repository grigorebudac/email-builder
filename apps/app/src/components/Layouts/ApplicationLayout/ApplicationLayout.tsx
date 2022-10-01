import React from 'react';
import { Grid, LEGOLogo, Navbar, Text } from '@lego/klik-ui';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box } from '@chakra-ui/layout';

interface SidebarItem {
  title: string;
  route: string;
}

interface ApplicationLayoutProps {
  title: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'Templates',
    route: '/',
  },
  {
    title: 'History',
    route: '/history',
  },
];

const ApplicationLayout = (
  props: React.PropsWithChildren<ApplicationLayoutProps>
) => {
  const router = useRouter();

  return (
    <Grid
      gridAutoRows={{ md: 'auto 1fr', base: 'auto 1fr' }}
      gridTemplateAreas={{
        md: `"side breadcrumbs" "side content"`,
        base: `"side" "content"`,
      }}
      gridTemplateColumns={{ md: 'auto 1fr', base: '1fr' }}
      height="100vh"
    >
      <Grid.Item as="aside" gridArea="side">
        <Navbar isFullWidth={true} orientation="vertical">
          <Navbar.Brand href="/">
            <LEGOLogo mr="24px" />
            <Text fontSize="lg">Email Service</Text>
          </Navbar.Brand>

          <Navbar.Segment>
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.title} href={item.route}>
                <Navbar.Item isActive={item.route === router.route}>
                  {item.title}
                </Navbar.Item>
              </Link>
            ))}
          </Navbar.Segment>
        </Navbar>
      </Grid.Item>

      <Grid.Item as="article" gridArea="content" ml={4} p={4}>
        <Text as="h1" textStyle="h1">
          {props.title}
        </Text>

        <Box mt="3rem">{props.children}</Box>
      </Grid.Item>
    </Grid>
  );
};

export default ApplicationLayout;
