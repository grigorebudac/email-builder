import React from 'react';
import { Grid, Space } from '@arco-design/web-react';
import styled from '@emotion/styled';
import { theme } from '@lego/klik-ui';

type TableSizeGeneratorProps = {
  setHoveredTableSize(arg0: { row: number; col: number }): void;
  setTableSize(arg0: { row: number; col: number }): void;
  tableSize: {
    row: number;
    col: number;
  };
  hoveredTableSize: {
    row: number;
    col: number;
  };
};

const TableSizeGenerator = ({
  setHoveredTableSize,
  setTableSize,
  tableSize,
  hoveredTableSize,
}: TableSizeGeneratorProps) => {
  const Row = Grid.Row;
  const Col = Grid.Col;

  return (
    <div
      onMouseLeave={() => setHoveredTableSize({ row: 0, col: 0 })}
      style={{ width: 'fit-content', marginTop: '-10px' }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Row key={i} style={{ marginBottom: 6 }}>
          <Space direction="horizontal">
            {Array.from({ length: 5 }, (_, j) => (
              <Col span={4} key={j}>
                <RowColIndicator
                  selected={i < tableSize.row && j < tableSize.col}
                  hovered={i < hoveredTableSize.row && j < hoveredTableSize.col}
                  onMouseEnter={() =>
                    setHoveredTableSize({ row: i + 1, col: j + 1 })
                  }
                  onClick={() => setTableSize({ row: i + 1, col: j + 1 })}
                ></RowColIndicator>
              </Col>
            ))}
          </Space>
        </Row>
      ))}
    </div>
  );
};

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

export default TableSizeGenerator;
