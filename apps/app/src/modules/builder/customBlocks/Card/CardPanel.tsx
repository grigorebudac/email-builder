import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';
import {
  AttributesPanelWrapper,
  ImageUploaderField,
  TextField,
  InputWithUnitField,
  ColorPickerField,
  CheckboxField,
  SelectField,
} from 'easy-email-extensions';
import CollapseWrapper from '../../components/CollapseWrapper';

function CardPanel() {
  const { focusIdx } = useFocusIdx();

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
            <TextField
              label="Button Text"
              name={`${focusIdx}.data.value.buttonLabel`}
              alignment="center"
            />
            <Grid.Row>
              <Grid.Col span={11}>
                <TextField
                  prefix={<IconLink />}
                  label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
                  name={`${focusIdx}.data.value.href`}
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <SelectField
                  label="Target"
                  name={`${focusIdx}.data.value.target`}
                  options={[
                    {
                      value: '',
                      label: '_self',
                    },
                    {
                      value: '_blank',
                      label: '_blank',
                    },
                  ]}
                />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item name="0" header="Appearance">
          <CheckboxField
            name={`${focusIdx}.data.value.options`}
            label="Image"
            direction="horizontal"
            labelHidden
            options={[
              {
                value: 'with_image',
                label: 'With Image',
              },
              {
                value: 'with_border',
                label: 'With Border',
              },
              {
                value: 'inset_image',
                label: 'Inset Image',
              },
              {
                value: 'with_button',
                label: 'With Button',
              },
            ]}
          />
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
            <Grid.Row>
              <Grid.Col span={11}>
                <ColorPickerField
                  label="Button color"
                  name={`${focusIdx}.attributes.button-color`}
                  alignment="center"
                />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <ColorPickerField
                  label="Button text color"
                  name={`${focusIdx}.attributes.button-label-color`}
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
