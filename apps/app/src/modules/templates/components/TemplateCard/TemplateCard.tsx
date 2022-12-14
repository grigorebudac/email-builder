import Image from 'next/image';
import { Box, Flex, Grid, theme } from '@lego/klik-ui';
import FoldableButton from '../FoldableButton';

import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg';
import { ReactComponent as DeleteIcon } from '@/assets/svg/delete.svg';
import { ReactComponent as DuplicateIcon } from '@/assets/svg/duplicate.svg';

interface TemplateCardProps {
  templateId: string;
  previewImage: string;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const TemplateCard = ({
  templateId,
  previewImage,
  onEdit,
  onDelete,
  onDuplicate,
}: TemplateCardProps) => {
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
          objectPosition="center 0px"
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
          data-cy={`editTemplate-${templateId}`}
          icon={<EditIcon />}
          activeColor={theme.colors.warning[400]}
          label="Edit"
          onClick={onEdit}
        />
        <FoldableButton
          data-cy={`deleteTemplate-${templateId}`}
          icon={<DeleteIcon />}
          activeColor={theme.colors.error[400]}
          label="Delete"
          onClick={onDelete}
        />
        <FoldableButton
          data-cy={`duplicateTemplate-${templateId}`}
          icon={<DuplicateIcon />}
          activeColor={theme.colors.information[400]}
          label="Duplicate"
          onClick={onDuplicate}
        />
      </Grid>
    </Flex>
  );
};

export default TemplateCard;
