import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { Collapse, Grid } from '@arco-design/web-react';
import {
  AttributesPanelWrapper,
  InputWithUnitField,
  RadioGroupField,
} from 'easy-email-extensions';
import CollapseWrapper from '../../components/CollapseWrapper';

function CardPanel() {
  const { focusIdx } = useFocusIdx();

  return (
    // @ts-ignore
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name="0" header="Settings">
          <Stack vertical spacing="extraTight">
            <Grid.Row>
              <Grid.Col span={11}>
                <InputWithUnitField
                  label="Size"
                  name={`${focusIdx}.attributes.width`}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <RadioGroupField
                label="Align"
                name={`${focusIdx}.attributes.align`}
                options={options}
              />
            </Grid.Row>
          </Stack>
        </Collapse.Item>

        <Collapse.Item name="1" header="Padding">
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

export default CardPanel;

const options = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'center',
    label: 'Center',
  },
  {
    value: 'right',
    label: 'Right',
  },
];
