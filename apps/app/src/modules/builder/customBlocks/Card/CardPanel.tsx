import React, { useRef } from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import {
  AttributesPanelWrapper,
  ImageUploaderField,
  TextField,
  InputWithUnitField,
  ColorPickerField,
  RadioGroupField,
  CheckboxField,
} from 'easy-email-extensions';
import CollapseWrapper from '../../components/CollapseWrapper';
import { Checkbox } from '@lego/klik-ui';

function CardPanel() {
  const { focusIdx } = useFocusIdx();

  const testRef = useRef();

  return (
    // @ts-ignore
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item name="1" header="Settings">
          <Space direction="vertical">
            <ImageUploaderField
              label="Image Source"
              name={`${focusIdx}.data.value.imageSrc`}
              helpText="The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally."
            />
            <TextField
              label="Title"
              name={`${focusIdx}.data.value.title`}
              alignment="center"
            />
            <TextField
              label="Description"
              name={`${focusIdx}.data.value.description`}
              alignment="center"
            />
          </Space>
        </Collapse.Item>

        <Collapse.Item name="0" header="Appearance">
          <Stack vertical spacing="extraTight">
            <Grid.Row>
              <Grid.Col span={11}>
                {/* <CheckboxField
                  name={`${focusIdx}.data.value.insetImage`}
                  label="Image"
                  options={[
                    {
                      value: 'inset_image',
                      label: 'Inset Image',
                    },
                    {
                      value: 'with_image',
                      label: 'With Image',
                    },
                  ]}
                /> */}

                <Checkbox
                  size="sm"
                  ref={testRef}
                  name={`${focusIdx}.data.value.insetImage`}
                >
                  Inset Image
                </Checkbox>
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                {/* name={`${focusIdx}.data.value.withImage`} */}
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                {/* name={`${focusIdx}.data.value.withBorder`} */}
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                {/* name={`${focusIdx}.data.value.withButton`} */}
              </Grid.Col>
            </Grid.Row>
          </Stack>
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

        <Collapse.Item name="2" header="Colors">
          <Stack vertical spacing="extraTight">
            <Grid.Row>
              <Grid.Col span={11}>
                <ColorPickerField
                  label="Title color"
                  name={`${focusIdx}.attributes.title-color`}
                  alignment="center"
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <ColorPickerField
                  label="Description color"
                  name={`${focusIdx}.attributes.description-color`}
                  alignment="center"
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
