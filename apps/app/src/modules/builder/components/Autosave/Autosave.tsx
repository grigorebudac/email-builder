import { useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { IEmailTemplate } from 'easy-email-editor';

const DEBOUNCE_SAVE_DELAY_MS = 1000;

interface AutosaveProps {
  values: IEmailTemplate;
  onSave: () => void;
}

export default function Autosave({ values, onSave }: AutosaveProps) {
  const prevValues = useRef<IEmailTemplate>(values);

  const debouncedSave = useCallback(
    debounce(async (newData: IEmailTemplate) => {
      prevValues.current = newData;
      onSave();
    }, DEBOUNCE_SAVE_DELAY_MS),
    []
  );

  useEffect(() => {
    if (!isEqual(prevValues.current, values)) {
      debouncedSave(values);
    }
  }, [values, debouncedSave]);

  return null;
}
