import React from 'react';
import { Grid, Space } from '@arco-design/web-react';
import { TableGeneratorValues } from '@/modules/builder/types/table.types';
import RowColIndicator from './TableSizeGenerator.styles';

type TableSizeGeneratorProps = {
  setHoveredTableSize(arg0: { row: number; col: number }): void;
  setTableSize(arg0: { row: number; col: number }): void;
  tableSize: TableGeneratorValues;
  hoveredTableSize: TableGeneratorValues;
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

export default TableSizeGenerator;
