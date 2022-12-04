import styled from '@emotion/styled';
import { Flex } from '@lego/klik-ui';

export const CardWrapper = styled(Flex)`
  min-height: 300px;
  height: 100%;

  cursor: pointer;
  transition: all 0.3s ease-in;

  circle,
  path {
    transition: all 0.3s ease-in;
  }

  &:hover {
    transition: all 0.3s ease-in;
    border-color: #179fe3;

    circle,
    path {
      transition: all 0.3s ease-in;
      stroke: #179fe3;
    }
  }
`;
