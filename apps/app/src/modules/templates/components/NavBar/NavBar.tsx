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
      <Navbar.Segment display={{ base: 'none', md: 'flex' }}>
        <Button
          data-cy="createTemplate"
          size="sm"
          variant="ghost"
          onClick={onCreate}
          color="white"
        >
          Create Template
        </Button>
      </Navbar.Segment>
      <Navbar.Burger display={{ base: 'block', lg: 'none' }} />
    </Navbar>
  );
};

export default NavBar;
