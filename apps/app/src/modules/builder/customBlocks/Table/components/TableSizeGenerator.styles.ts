import styled from '@emotion/styled';
import { theme } from '@lego/klik-ui';

const RowColIndicator = styled.div<{ selected: boolean; hovered: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid ${theme.colors['dark-blue'][400]};
  background: ${(props) => {
    if (props.hovered && props.selected) {
      return theme.colors.magenta[100];
    }

    if (props.selected) {
      return theme.colors['dark-blue'][400];
    }

    if (props.hovered) {
      return theme.colors['light-blue'][100];
    }

    return 'transparent';
  }};
`;

export default RowColIndicator;
