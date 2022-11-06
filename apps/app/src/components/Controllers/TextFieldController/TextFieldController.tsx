import { InputProps } from '@chakra-ui/input';
import { FormControl, Input } from '@lego/klik-ui';
import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';

export type TextFieldControllerProps = Omit<
  InputProps,
  'error' & 'isRequired'
> & {
  control?: Control<any, object>;
  icon?: React.ReactNode;
  error?: FieldError;
  label?: string;
  name: string;
};

const TextFieldController: React.FC<TextFieldControllerProps> = ({
  control,
  name,
  label,
  isRequired,
  icon,
  ...props
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} isRequired>
          <FormControl.Label>{label}</FormControl.Label>
          <Input.Group>
            {icon && (
              <Input.LeftElement pointerEvents="none">{icon}</Input.LeftElement>
            )}
            <Input {...field} {...props} isRequired={false} />
          </Input.Group>
          {!!error && (
            <FormControl.ErrorText>{error?.message}</FormControl.ErrorText>
          )}
        </FormControl>
      )}
      control={control}
      defaultValue=""
    />
  );
};

export { TextFieldController };
