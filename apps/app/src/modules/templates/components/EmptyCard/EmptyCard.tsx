import { theme } from '@lego/klik-ui';
import { CardWrapper } from './EmptyCard.styles';
import { ReactComponent as PlusIcon } from '@/assets/svg/plus.svg';

interface EmptyCardProps {
  onCreate: () => void;
}

const EmptyCard = ({ onCreate }: EmptyCardProps) => {
  return (
    <CardWrapper
      data-cy="createTemplate"
      justifyContent="center"
      alignItems="center"
      background={theme.colors.white}
      borderRadius={5}
      borderWidth={1}
      borderColor={theme.colors['slate'][100]}
      cursor="pointer"
      onClick={onCreate}
    >
      <PlusIcon />
    </CardWrapper>
  );
};

export default EmptyCard;
