import React from 'react';
import { Text } from '@lego/klik-ui';
import { ButtonWrapper } from './FoldableButton.styles';

interface FoldableButtonProps {
  icon: any;
  label: string;
  activeColor: string;
  onClick: () => void;
}

const FoldableButton = ({
  icon,
  label,
  activeColor,
  onClick,
}: FoldableButtonProps) => {
  return (
    <ButtonWrapper activeColor={activeColor} onClick={onClick}>
      <div>{icon}</div>

      <Text fontSize="14px">{label}</Text>
    </ButtonWrapper>
  );
};

export default FoldableButton;
