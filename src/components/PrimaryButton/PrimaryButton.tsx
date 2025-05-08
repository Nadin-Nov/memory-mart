import type { ReactElement } from 'react';
import { Button } from '@chakra-ui/react';

export interface ButtonProps {
  title: string;
  link: string;
  onClick?: (event: React.FormEvent) => void;
}

export const PrimaryButton = ({ title, link, onClick }: ButtonProps): ReactElement => {
  const primaryButtonHandler = (event: React.FormEvent): void => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };
  return (
    <Button
      type='submit'
      borderRadius={10}
      width='full'
      height={53}
      colorPalette='teal'
      paddingX='20'
      paddingY='4'
      onClick={primaryButtonHandler}
      asChild
    >
      <a href={link}>{title}</a>
    </Button>
  );
};
