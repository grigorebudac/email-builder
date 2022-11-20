import React, { useEffect, useRef, useState } from 'react';
import { Stack, useEditorContext, useFocusIdx } from 'easy-email-editor';
import { Collapse, Grid, Space, Typography } from '@arco-design/web-react';
import {
  AttributesPanelWrapper,
  InputWithUnitField,
  ColorPickerField,
  CheckboxField,
  SelectField,
  NumberField,
  RadioGroupField,
} from 'easy-email-extensions';
import CollapseWrapper from '../../components/CollapseWrapper';
import {
  TableOptionsType,
  TableBorderType,
} from '../../types/tableOptions.types';
import TableSizeGenerator from './components/TableSizeGenerator';
import { TableGeneratorValues } from '../../types/table.types';

function TablePanel() {
  const { focusIdx } = useFocusIdx();
  const { formHelpers } = useEditorContext();
  const isInitialMount = useRef(true);

  const [tableSize, setTableSize] = useState<TableGeneratorValues>({
    row: 3,
    col: 3,
  });

  const [hoveredTableSize, setHoveredTableSize] =
    useState<TableGeneratorValues>({
      row: 0,
      col: 0,
    });

  // loads the table size generator
  useEffect(() => {
    const cols = Number(
      formHelpers.getFieldState(`${focusIdx}.attributes.table-cols`).value
    );
    const rows = Number(
      formHelpers.getFieldState(`${focusIdx}.attributes.table-rows`).value
    );
    setTableSize({ row: rows, col: cols });
  }, []);

  // updates the values for the table size generator, nly works on update and not on initial load
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      formHelpers.change(`${focusIdx}.attributes.table-rows`, tableSize.row);
      formHelpers.change(`${focusIdx}.attributes.table-cols`, tableSize.col);
    }
  }, [tableSize]);

  return (
    // @ts-ignore
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name="1" header="Size & Settings">
          <Space direction="vertical">
            <Grid.Row>
              <Grid.Col span={11}>
                <NumberField
                  name={`${focusIdx}.attributes.table-rows`}
                  label={'Rows'}
                  max={5}
                  min={1}
                  disabled
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <NumberField
                  name={`${focusIdx}.attributes.table-cols`}
                  label={'Columns'}
                  max={5}
                  min={1}
                  disabled
                />
              </Grid.Col>
            </Grid.Row>

            <Typography style={{ marginBottom: 5 }}>Table Size</Typography>

            <TableSizeGenerator
              setHoveredTableSize={setHoveredTableSize}
              setTableSize={setTableSize}
              tableSize={tableSize}
              hoveredTableSize={hoveredTableSize}
            />

            <CheckboxField
              name={`${focusIdx}.data.value.options`}
              label="Options"
              direction="horizontal"
              style={{ marginTop: '-20px' }}
              options={[
                {
                  value: TableOptionsType.WITH_HEADER,
                  label: 'Header',
                },
                {
                  value: TableOptionsType.WITH_INSIDE_BORDER,
                  label: 'Inside Border',
                },
                {
                  value: TableOptionsType.WITH_OUTSIDE_BORDER,
                  label: 'Outside Border',
                },
              ]}
            />
          </Space>
        </Collapse.Item>

        <Collapse.Item name="0" header="Appearance">
          <Space direction="vertical">
            <RadioGroupField
              name={`${focusIdx}.data.value.headerTextAlign`}
              label="Header Text Align"
              direction="horizontal"
              options={[
                {
                  value: TableOptionsType.ALIGN_LEFT,
                  label: 'left',
                },
                {
                  value: TableOptionsType.ALIGN_CENTER,
                  label: 'center',
                },
                {
                  value: TableOptionsType.ALIGN_RIGHT,
                  label: 'right',
                },
              ]}
            />

            <RadioGroupField
              name={`${focusIdx}.data.value.bodyTextAlign`}
              label="Body Text Align"
              direction="horizontal"
              options={[
                {
                  value: TableOptionsType.ALIGN_LEFT,
                  label: 'left',
                },
                {
                  value: TableOptionsType.ALIGN_CENTER,
                  label: 'center',
                },
                {
                  value: TableOptionsType.ALIGN_RIGHT,
                  label: 'right',
                },
              ]}
            />

            <InputWithUnitField
              label="Header Font Size"
              name={`${focusIdx}.attributes.header-font-size`}
            />

            <InputWithUnitField
              label="Cell Font Size"
              name={`${focusIdx}.attributes.cell-font-size`}
            />

            <ColorPickerField
              name={`${focusIdx}.attributes.header-background-color`}
              label={'Header Background Color'}
            />

            <ColorPickerField
              name={`${focusIdx}.attributes.header-font-color`}
              label={'Header Font Color'}
            />

            <ColorPickerField
              name={`${focusIdx}.attributes.body-background-color`}
              label={'Body Background Color'}
            />

            <ColorPickerField
              name={`${focusIdx}.attributes.body-font-color`}
              label={'Body Font Color'}
            />

            <ColorPickerField
              name={`${focusIdx}.attributes.border-color`}
              label={'Border Color'}
            />

            <InputWithUnitField
              label="Outside Border Width"
              name={`${focusIdx}.attributes.outside-border-width`}
            />

            <InputWithUnitField
              label="Inside Border Width"
              name={`${focusIdx}.attributes.inside-border-width`}
            />

            <InputWithUnitField
              label="Header Border Width"
              name={`${focusIdx}.attributes.header-border-width`}
            />

            <SelectField
              label="Border Style"
              name={`${focusIdx}.data.value.borderStyle`}
              options={[
                {
                  value: TableBorderType.NONE,
                  label: 'none',
                },
                {
                  value: TableBorderType.SOLID,
                  label: 'solid',
                },
                {
                  value: TableBorderType.DOTTED,
                  label: 'dotted',
                },
                {
                  value: TableBorderType.DASHED,
                  label: 'dashed',
                },
                {
                  value: TableBorderType.DOUBLE,
                  label: 'double',
                },
                {
                  value: TableBorderType.GROOVE,
                  label: 'groove',
                },
                {
                  value: TableBorderType.RIDGE,
                  label: 'ridge',
                },
                {
                  value: TableBorderType.INSET,
                  label: 'inset',
                },
                {
                  value: TableBorderType.OUTSET,
                  label: 'outset',
                },
              ]}
            />
          </Space>
        </Collapse.Item>

        <Collapse.Item name="2" header="Padding">
          <Stack vertical spacing="extraTight">
            <Grid.Row>
              <Grid.Col span={11}>
                <InputWithUnitField
                  label="Top"
                  name={`${focusIdx}.attributes.padding-top`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <InputWithUnitField
                  label="Bottom"
                  name={`${focusIdx}.attributes.padding-bottom`}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                <InputWithUnitField
                  label="Left"
                  name={`${focusIdx}.attributes.padding-left`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <InputWithUnitField
                  label="Right"
                  name={`${focusIdx}.attributes.padding-right`}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <InputWithUnitField
                  label="Inner Cell Horizontal"
                  name={`${focusIdx}.attributes.inner-cell-padding-h`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <InputWithUnitField
                  label="Inner Cell Vertical"
                  name={`${focusIdx}.attributes.inner-cell-padding-v`}
                />
              </Grid.Col>
            </Grid.Row>

            <InputWithUnitField
              label="Last Row Padding"
              name={`${focusIdx}.attributes.last-row-padding`}
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name="2" header="Table Values">
          <Stack vertical spacing="extraTight">
            {[...Array(tableSize.row)].map((_, i) => (
              <div key={`header-${i}`}>
                <InputWithUnitField
                  label={`Header ${i}`}
                  name={`${focusIdx}.data.value.header-${i}`}
                />
              </div>
            ))}
            {[...Array(tableSize.row)].map((_, i) => (
              <div key={`cell-group-${i}`}>
                {[...Array(tableSize.col)].map((_, j) => (
                  <InputWithUnitField
                    key={`cell-${i}-${j}`}
                    label={`Cell ${i}-${j}`}
                    name={`${focusIdx}.data.value.cell-${i}-${j}`}
                  />
                ))}
              </div>
            ))}
          </Stack>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}

export default TablePanel;
