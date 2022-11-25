import { Button, LEGOLogo, Navbar, Spacer, Text } from '@lego/klik-ui';

interface NavBarProps {
  onCreate: () => void;
}

const NavBar = ({ onCreate }: NavBarProps) => {
  return (
    <Navbar>
      <Navbar.Brand href="#brand">
        <LEGOLogo mr="24px" />
        <Text>Email builder</Text>
      </Navbar.Brand>
      <Spacer />
      <Navbar.Item onClick={onCreate}>Create</Navbar.Item>
      <Navbar.Burger display={{ base: 'block', lg: 'none' }} />
    </Navbar>
  );
};

export default NavBar;
