import React, { useEffect, useRef, useState } from 'react';
import {
  Stack,
  useEditorContext,
  useEditorProps,
  useFocusIdx,
} from 'easy-email-editor';
import { Collapse, Grid, Space, Typography } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import {
  AttributesPanelWrapper,
  ImageUploaderField,
  TextField,
  InputWithUnitField,
  ColorPickerField,
  CheckboxField,
  SelectField,
  NumberField,
  Align,
  RadioGroupField,
} from 'easy-email-extensions';
import CollapseWrapper from '../../components/CollapseWrapper';
import {
  TableOptionsType,
  TableTargetType,
} from '../../types/tableOptions.types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@lego/klik-ui';
import { Field } from 'react-final-form';
import { table } from 'console';

function TablePanel() {
  const { focusIdx } = useFocusIdx();
  const { pageData, formHelpers, formState } = useEditorContext();
  const isInitialMount = useRef(true);

  const [tableSize, setTableSize] = useState<{
    row: number;
    col: number;
  }>({
    row: 3,
    col: 3,
  });

  const [hoveredTbleSize, setHoveredTableSize] = useState<{
    row: number;
    col: number;
  }>({
    row: 0,
    col: 0,
  });

  // only works on update and not on initial load
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      formHelpers.change(`${focusIdx}.attributes.table-rows`, tableSize.row);
      formHelpers.change(`${focusIdx}.attributes.table-cols`, tableSize.col);
    }
  }, [tableSize]);

  const Row = Grid.Row;
  const Col = Grid.Col;

  return (
    // @ts-ignore
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item name="1" header="Size">
          <Space direction="vertical">
            <Grid.Row>
              <Grid.Col span={11}>
                <NumberField
                  name={`${focusIdx}.attributes.table-rows`}
                  label={'Rows'}
                  max={5}
                  min={1}
                  hideControl
                  onChangeCapture={(e) => {
                    const formValue = (e.target as HTMLInputElement).value;
                    const row = Number(formValue);
                    if (row < 0 && row > 5) {
                      return;
                    }
                    setTableSize({ row: Number(row), col: tableSize.col });
                  }}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <NumberField
                  name={`${focusIdx}.attributes.table-cols`}
                  label={'Columns'}
                  max={5}
                  min={1}
                  hideControl
                  onChangeCapture={(e) => {
                    const col = (e.target as HTMLInputElement).value;
                    setTableSize({ row: tableSize.row, col: Number(col) });
                  }}
                />
              </Grid.Col>
            </Grid.Row>

            <Typography style={{ marginBottom: 5 }}>Table Size:</Typography>

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
                          hovered={
                            i < hoveredTbleSize.row && j < hoveredTbleSize.col
                          }
                          onMouseEnter={() =>
                            setHoveredTableSize({ row: i + 1, col: j + 1 })
                          }
                          onClick={() =>
                            setTableSize({ row: i + 1, col: j + 1 })
                          }
                        ></RowColIndicator>
                      </Col>
                    ))}
                  </Space>
                </Row>
              ))}
            </div>
          </Space>
        </Collapse.Item>

        <Collapse.Item name="0" header="Appearance">
          <RadioGroupField
            name={`${focusIdx}.attributes.text_align`}
            label="Text-align"
            direction="horizontal"
            options={[
              {
                value: 'CardOptionsType.WITH_IMAGE',
                label: 'left',
              },
              {
                value: 'CardOptionsType.WITH_BORDER',
                label: 'center',
              },
              {
                value: 'CardOptionsType.INSET_IMAGE',
                label: 'right',
              },
            ]}
          />

          <CheckboxField
            name={`${focusIdx}.test`}
            label="Border"
            direction="horizontal"
            options={[
              {
                value: TableOptionsType.WITH_BORDER,
                label: 'Border',
              },
            ]}
          />

          <ColorPickerField
            name={`${focusIdx}.attributes.header-color`}
            label={'Header color'}
          />

          {/* 

            Header Background-Color

            Body Background-Color

            Header Font-Color

            Body Font-Color

            Border-Collapse

            Border-Spacing

            Border-Width 
          Border-Style

            */}
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
          </Stack>
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}

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

export default TablePanel;
