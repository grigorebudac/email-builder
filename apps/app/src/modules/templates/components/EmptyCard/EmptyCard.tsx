import Image from 'next/image';
import { Box, Flex, Grid, theme } from '@lego/klik-ui';
import FoldableButton from '../FoldableButton';

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete.svg';
import { ReactComponent as DuplicateIcon } from '@/assets/svg/duplicate.svg';
import { ReactComponent as PlusIcon } from '@/assets/svg/plus.svg';
import { CardWrapper } from './EmptyCard.styles';

interface CardProps {
  onCreate: () => void;
}

const Card = ({ onCreate }: CardProps) => {
  return (
    <CardWrapper
      justifyContent="center"
      alignItems="center"
      background={theme.colors.white}
      borderRadius={5}
      borderWidth={1}
      borderColor={theme.colors['slate'][50]}
      cursor="pointer"
      onClick={onCreate}
    >
      <PlusIcon />
    </CardWrapper>
  );
};

export default Card;
