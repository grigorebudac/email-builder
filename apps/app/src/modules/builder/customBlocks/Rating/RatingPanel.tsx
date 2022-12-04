import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import {
  AttributesPanelWrapper,
  ColorPickerField,
  InputWithUnitField,
  NumberField,
} from 'easy-email-extensions';
import CollapseWrapper from '../../components/CollapseWrapper';
import { Collapse, Grid } from '@arco-design/web-react';

function RatingPanel() {
  const { focusIdx } = useFocusIdx();
  return (
    // @ts-ignore
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1']}>
        <Collapse.Item name="0" header="Rating settings">
          <Stack vertical>
            <NumberField
              label="Rating"
              name={`${focusIdx}.data.value.stars`}
              inline
              alignment="center"
              max={5}
              min={0}
            />
            <ColorPickerField
              label="Star color"
              name={`${focusIdx}.attributes.star-color`}
              inline
              alignment="center"
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name="1" header="Padding">
          <Stack vertical spacing="extraTight">
            <InputWithUnitField
              label="Gap"
              name={`${focusIdx}.attributes.gap`}
            />
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

export default RatingPanel;
