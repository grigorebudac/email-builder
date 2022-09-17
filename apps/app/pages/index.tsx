import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Input,
  LEGOLogo,
  Navbar,
  Spacer,
  Stack,
  Table,
  Text,
} from '@lego/klik-ui';
import { AlertBold, ArrowDownBold, SearchBold } from '@lego/klik-ui/icons';
import React from 'react';

// NextJS requires default exports for components, and they are not planning on changing their APIS
// eslint-disable-next-line import/no-default-export
export default function Home() {
  const [activeItem, setActiveItem] = React.useState(-1);

  return (
    <>
      <Navbar bg="teal.700">
        <Navbar.Brand href="#brand">
          <LEGOLogo mr="24px" />
          <Text>App name</Text>
        </Navbar.Brand>
        <Navbar.Segment display={{ base: 'none', lg: 'flex' }}>
          <Navbar.Item
            href="#link-one"
            isActive={activeItem === 0}
            onClick={() => void setActiveItem(0)}
          >
            Primary Link 1
          </Navbar.Item>
          <Navbar.Item
            href="#link-two"
            isActive={activeItem === 1}
            onClick={() => void setActiveItem(1)}
          >
            Primary Link 2
          </Navbar.Item>
          <Navbar.Item
            hasMenu={true}
            icon={ArrowDownBold}
            isActive={activeItem === 2}
            title="Primary Menu"
          >
            <Navbar.Option
              href="#subitem-one"
              onClick={() => void setActiveItem(2)}
            >
              Sub-menu item 1
            </Navbar.Option>
            <Navbar.Option
              href="#subitem-two"
              onClick={() => void setActiveItem(2)}
            >
              Sub-menu item 2
            </Navbar.Option>
            <Navbar.Option
              href="#subitem-three"
              onClick={() => void setActiveItem(2)}
            >
              Sub-menu item 3
            </Navbar.Option>
          </Navbar.Item>
        </Navbar.Segment>
        <Spacer />
        <Navbar.Segment display={{ base: 'none', md: 'flex' }}>
          <IconButton
            alignSelf="center"
            aria-label="notifications"
            color="inherit"
            icon={<Icon as={SearchBold} />}
            variant="ghost"
          />
          <IconButton
            alignSelf="center"
            aria-label="notifications"
            color="inherit"
            icon={<Icon as={AlertBold} />}
            variant="ghost"
          />
        </Navbar.Segment>
        <Navbar.Burger display={{ base: 'block', lg: 'none' }} />
      </Navbar>

      <Container maxW="container.xl" marginTop={5}>
        <Box>
          <Stack spacing={4}>
            <Input.Group>
              <Input.LeftAddon>https://</Input.LeftAddon>
              <Input placeholder="Placeholder test" />
              <Input.RightAddon>lego.com</Input.RightAddon>
            </Input.Group>

            <Input.Group>
              <Input.LeftAddon>€</Input.LeftAddon>
              <Input placeholder="Placeholder test" />
            </Input.Group>

            <Input.Group>
              <Input placeholder="Placeholder test" />
              <Input.RightAddon>kg</Input.RightAddon>
            </Input.Group>
          </Stack>
        </Box>

        <Button marginTop={5}>Hello</Button>

        <Text marginTop={5} textStyle="h1">
          Header H1
        </Text>

        <Table marginTop={5} size="sm">
          <Table.Head>
            <Table.Row>
              <Table.ColumnHeader>To Convert</Table.ColumnHeader>
              <Table.ColumnHeader>Into</Table.ColumnHeader>
              <Table.ColumnHeader isNumeric={true}>
                Multiply By
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>inches</Table.Cell>
              <Table.Cell>millimetres (mm)</Table.Cell>
              <Table.Cell isNumeric={true}>25.4</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>feet</Table.Cell>
              <Table.Cell>centimetres (cm)</Table.Cell>
              <Table.Cell isNumeric={true}>30.48</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>yards</Table.Cell>
              <Table.Cell>metres (m)</Table.Cell>
              <Table.Cell isNumeric={true}>0.91444</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </>
  );
}
