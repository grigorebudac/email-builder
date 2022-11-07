import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import {
  AttributesPanelWrapper,
  ColorPickerField,
  TextField,
} from 'easy-email-extensions';

function CardPanel() {
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
          label="Description"
          name={`${focusIdx}.data.value.description`}
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

export default CardPanel;
