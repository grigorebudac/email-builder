import { LEGOLogo, Navbar, Spacer, Text } from '@lego/klik-ui';

interface NavBarProps {
  onLogOut: () => void;
}

const NavBar = ({ onLogOut }: NavBarProps) => {
  return (
    <Navbar>
      <Navbar.Brand href="#brand">
        <LEGOLogo mr="24px" />
        <Text>Email builder</Text>
      </Navbar.Brand>
      <Spacer />
      <Navbar.Item onClick={onLogOut}>Log out</Navbar.Item>
      <Navbar.Burger display={{ base: 'block', lg: 'none' }} />
    </Navbar>
  );
};

export default NavBar;
