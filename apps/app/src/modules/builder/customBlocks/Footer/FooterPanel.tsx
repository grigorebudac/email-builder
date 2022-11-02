import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import {
  AttributesPanelWrapper,
  ColorPickerField,
  TextField,
} from 'easy-email-extensions';

function FooterPanel() {
  const { focusIdx } = useFocusIdx();
  return (
    // @ts-ignore
    <AttributesPanelWrapper>
      <Stack vertical>
        <TextField
          label="Title"
          name={`${focusIdx}.data.value.title`}
          inline
          alignment="center"
        />
        <TextField
          label="Title"
          name={`${focusIdx}.data.value.description`}
          inline
          alignment="center"
        />
        <ColorPickerField
          label="Background color"
          name={`${focusIdx}.attributes.background-color`}
          inline
          alignment="center"
        />
        <ColorPickerField
          label="Title color"
          name={`${focusIdx}.attributes.title-color`}
          inline
          alignment="center"
        />
      </Stack>
    </AttributesPanelWrapper>
  );
}

export default FooterPanel;
