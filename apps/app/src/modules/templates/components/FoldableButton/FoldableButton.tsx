import React from 'react';
import { Text } from '@lego/klik-ui';
import { ButtonWrapper } from './FoldableButton.styles';

interface FoldableButtonProps {
  icon: any;
  label: string;
  activeColor: string;
  onClick: () => void;
  'data-cy'?: string;
}

const FoldableButton = ({
  icon,
  label,
  activeColor,
  onClick,
  ...props
}: FoldableButtonProps) => {
  return (
    <ButtonWrapper activeColor={activeColor} onClick={onClick} {...props}>
      <div>{icon}</div>

      <Text fontSize="14px">{label}</Text>
    </ButtonWrapper>
  );
};

export default FoldableButton;
