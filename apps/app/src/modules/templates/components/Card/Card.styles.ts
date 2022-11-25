import styled from '@emotion/styled';
import { Flex } from '@lego/klik-ui';

export const CardWrapper = styled(Flex)<{ empty: boolean }>`
  cursor: pointer;
  transition: all 0.3s ease-in;

  circle,
  path {
    transition: all 0.3s ease-in;
  }

  &:hover {
    transition: all 0.3s ease-in;
    border-color: ${(props) => (props.empty ? '#179fe3' : '#f1f1f1')};

    circle,
    path {
      transition: all 0.3s ease-in;
      stroke: ${(props) => (props.empty ? '#179fe3' : '#e3e3e1')};
    }
  }
`;
