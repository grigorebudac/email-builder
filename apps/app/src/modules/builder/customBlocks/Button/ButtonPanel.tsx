import { IconFont, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { Grid, Popover, Space } from '@arco-design/web-react';
import {
  Align,
  AttributesPanelWrapper,
  BackgroundColor,
  Border,
  ClassName,
  Color,
  ContainerBackgroundColor,
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
import React from 'react';
import { useField } from 'react-final-form';
import { Button as ArcoButton, Collapse } from '@arco-design/web-react';
import { Stack } from '@lego/klik-ui';
import CollapseWrapper from '../../components/CollapseWrapper';

function ButtonPanel() {
  const { focusIdx } = useFocusIdx();
  const { mergeTags } = useEditorProps();

  const { input } = useField(`${focusIdx}.data.value.content`, {
    parse: (v) => v,
  });

  return (
    <>
      {/* @ts-ignore */}
      <AttributesPanelWrapper>
        <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
          <Collapse.Item name="0" header="Data">
            <Space direction="vertical">
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

          <Collapse.Item name="1" header="Spacing">
            <Space direction="vertical">
              <Padding title="Padding" attributeName="padding" />
              <Padding title="Inner padding" attributeName="inner-padding" />
            </Space>
          </Collapse.Item>

          <Collapse.Item name="2" header="Styling">
            <Space direction="vertical">
              <Grid.Row>
                <Grid.Col span={11}>
                  <Color title="Text color" />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <BackgroundColor title="Button color" />
                </Grid.Col>
                <Grid.Col span={11}>
                  <ContainerBackgroundColor title="Background color" />
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
