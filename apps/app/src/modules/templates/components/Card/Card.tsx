import Image from 'next/image';
import { Box, Flex, Grid, theme } from '@lego/klik-ui';
import FoldableButton from '../FoldableButton';

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete.svg';
import { ReactComponent as DuplicateIcon } from '@/assets/svg/duplicate.svg';

interface CardProps {
  previewImage: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Card = ({ previewImage, onEdit, onDelete }: CardProps) => {
  return (
    <Flex
      position="relative"
      justifyContent="flex-start"
      flexDirection={'column'}
      background={theme.colors.white}
      borderRadius={5}
      overflow="hidden"
      borderWidth={1}
      borderColor={theme.colors['slate'][100]}
      cursor="pointer"
    >
      <Box
        position="relative"
        height={260}
        width={'100%'}
        borderBottom="1px solid #e3e3e1"
        onClick={onEdit}
      >
        <Image
          src={previewImage || '/placeholder.png'}
          layout="fill"
          objectFit="cover"
          objectPosition="0px 0px"
          alt="image"
        />
      </Box>

      <Grid
        templateColumns={'repeat(3, auto)'}
        maxWidth={'fit-content'}
        gap="1px"
        padding={'5px 10px'}
      >
        <FoldableButton
          icon={<EditIcon />}
          activeColor={theme.colors.warning[400]}
          label="Edit"
          onClick={onEdit}
        />
        <FoldableButton
          icon={<DeleteIcon />}
          activeColor={theme.colors.error[400]}
          label="Delete"
          onClick={onDelete}
        />
        <FoldableButton
          icon={<DuplicateIcon />}
          activeColor={theme.colors.information[400]}
          label="Duplicate"
          onClick={() => {}}
        />
      </Grid>
    </Flex>
  );
};

export default Card;
