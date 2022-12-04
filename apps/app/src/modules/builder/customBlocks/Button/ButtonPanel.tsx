import {
  IconFont,
  useEditorContext,
  useEditorProps,
  useFocusIdx,
} from 'easy-email-editor';
import { Grid, Popover, Space } from '@arco-design/web-react';
import {
  Align,
  AttributesPanelWrapper,
  Border,
  ClassName,
  ColorPickerField,
  FontFamily,
  FontSize,
  FontStyle,
  FontWeight,
  LetterSpacing,
  LineHeight,
  Link,
  MergeTags,
  Padding,
  TextDecoration,
  TextField,
  Width,
} from 'easy-email-extensions';
import React, { useEffect } from 'react';
import { useField } from 'react-final-form';
import { Button as ArcoButton, Collapse } from '@arco-design/web-react';
import CollapseWrapper from '../../components/CollapseWrapper';
import { ButtonType } from '../../types/button.types';
import { Radio } from '@arco-design/web-react';
import { Text } from '@lego/klik-ui';
import { color } from '@lego/design-tokens-core';

function ButtonPanel() {
  const { focusIdx } = useFocusIdx();
  const { mergeTags } = useEditorProps();

  const { input } = useField(`${focusIdx}.data.value.content`, {
    parse: (v) => v,
  });
  const { input: variantInput } = useField(`${focusIdx}.data.value.variant`, {
    parse: (v) => v,
  });
  const { input: defaultBackgroundColor } = useField(
    `${focusIdx}.attributes.default-background-color`,
    { parse: (v) => v }
  );
  const { input: defaultTextColor } = useField(
    `${focusIdx}.attributes.default-color`,
    {
      parse: (v) => v,
    }
  );
  const { input: outlineBackgroundColor } = useField(
    `${focusIdx}.attributes.outline-background-color`,
    {
      parse: (v) => v,
    }
  );
  const { input: outlineTextColor } = useField(
    `${focusIdx}.attributes.outline-color`,
    {
      parse: (v) => v,
    }
  );
  const { input: ghostBackgroundColor } = useField(
    `${focusIdx}.attributes.ghost-background-color`,
    {
      parse: (v) => v,
    }
  );
  const { input: ghostTextColor } = useField(
    `${focusIdx}.attributes.ghost-color`,
    {
      parse: (v) => v,
    }
  );

  const { formHelpers } = useEditorContext();

  useEffect(() => {
    handleStylesByVariant(variantInput.value);
  }, [
    variantInput.value,
    defaultBackgroundColor.value,
    defaultTextColor.value,
    outlineBackgroundColor.value,
    outlineTextColor.value,
    ghostBackgroundColor.value,
    ghostTextColor.value,
  ]);

  useEffect(() => {
    handleInitialStyle();
  }, []);

  const initialStyles: { inputId: string; value: string }[] = [
    { inputId: 'default-background-color', value: color.brand.brightBlue },
    { inputId: 'default-color', value: color.neutral.white },
    { inputId: 'outline-color', value: color.brand.brightBlue },
    { inputId: 'outline-background-color', value: color.neutral.white },
    { inputId: 'ghost-color', value: color.brand.brightBlue },
    { inputId: 'ghost-background-color', value: 'transparent' },
  ];

  function handleInitialStyle() {
    initialStyles.forEach((initialStyle) => {
      if (
        !formHelpers.getFieldState(
          `${focusIdx}.attributes.${initialStyle.inputId}`
        )?.value
      ) {
        formHelpers.change(
          `${focusIdx}.attributes.${initialStyle.inputId}`,
          initialStyle.value
        );
      }
    });
  }

  function getFieldStateValue(field: string) {
    return formHelpers.getFieldState(`${focusIdx}.attributes.${field}`).value;
  }

  function handleStylesByVariant(variant: ButtonType) {
    let textColor;
    let backgroundColor;
    let border;

    switch (variant) {
      case ButtonType.DEFAULT:
        backgroundColor = getFieldStateValue('default-background-color');
        textColor = getFieldStateValue('default-color');
        border = 'none';
        break;

      case ButtonType.OUTLINE:
        backgroundColor = getFieldStateValue('outline-background-color');
        textColor = getFieldStateValue('outline-color');
        border = `2px solid ${textColor}`;
        break;

      case ButtonType.GHOST:
        backgroundColor = getFieldStateValue('ghost-background-color');
        textColor = getFieldStateValue('ghost-color');
        border = 'none';
        break;
    }

    formHelpers.change(
      `${focusIdx}.attributes.background-color`,
      backgroundColor
    );
    formHelpers.change(`${focusIdx}.attributes.color`, textColor);
    formHelpers.change(`${focusIdx}.attributes.border`, border);
  }

  const variantOptions = [
    {
      value: ButtonType.DEFAULT,
      label: 'default',
    },
    {
      value: ButtonType.OUTLINE,
      label: 'outline',
    },
    {
      value: ButtonType.GHOST,
      label: 'ghost',
    },
  ];

  return (
    <>
      {/* @ts-ignore */}
      <AttributesPanelWrapper>
        <CollapseWrapper defaultActiveKey={['1', '2', '3']}>
          <Collapse.Item name="1" header="Data">
            <Space direction="vertical">
              <Text>Variant</Text>
              <Radio.Group
                name={`${focusIdx}.attributes.variant`}
                onChange={(e) => {
                  formHelpers.change(`${focusIdx}.data.value.variant`, e);
                }}
                value={variantInput.value}
                options={variantOptions}
              />
              <TextField
                label={
                  <Space>
                    <span>Content</span>
                    {mergeTags && (
                      <Popover
                        trigger="click"
                        content={
                          <MergeTags
                            value={input.value}
                            onChange={input.onChange}
                          />
                        }
                      >
                        <ArcoButton
                          type="text"
                          icon={<IconFont iconName="icon-merge-tags" />}
                        />
                      </Popover>
                    )}
                  </Space>
                }
                name={`${focusIdx}.data.value.content`}
              />
              <Link />
              <Grid.Row>
                <Grid.Col span={11}>
                  <Width />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <FontWeight />
                </Grid.Col>
              </Grid.Row>
            </Space>
          </Collapse.Item>

          <Collapse.Item name="2" header="Spacing">
            <Space direction="vertical">
              <Padding title="Padding" attributeName="padding" />
              <Padding title="Inner padding" attributeName="inner-padding" />
            </Space>
          </Collapse.Item>

          <Collapse.Item name="3" header="Styling">
            <Space direction="vertical">
              <Grid.Row>
                <Grid.Col span={11}>
                  <ColorPickerField
                    label="Text color"
                    name={`${focusIdx}.attributes.${variantInput.value}-color`}
                    alignment="center"
                  />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <ColorPickerField
                    label="Button color"
                    name={`${focusIdx}.attributes.${variantInput.value}-background-color`}
                  />
                </Grid.Col>
                <Grid.Col span={11}>
                  <ColorPickerField
                    label="Background color"
                    name={`${focusIdx}.attributes.${variantInput.value}-container-background-color`}
                  />
                </Grid.Col>
              </Grid.Row>
            </Space>

            <Space direction="vertical">
              <Grid.Row>
                <Grid.Col span={11}>
                  <FontFamily />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <FontSize />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <FontWeight />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <LineHeight />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <TextDecoration />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <LetterSpacing />
                </Grid.Col>
              </Grid.Row>
              <Align />

              <FontStyle />
            </Space>

            <Border />

            <Grid.Col span={24}>
              <ClassName />
            </Grid.Col>
          </Collapse.Item>
        </CollapseWrapper>
      </AttributesPanelWrapper>
    </>
  );
}

export default ButtonPanel;
