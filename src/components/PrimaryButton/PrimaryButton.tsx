import type { ReactElement } from 'react';
import { Button } from '@chakra-ui/react';

export interface ButtonProps {
  title: string;
  link: string;
  isOldUser?: boolean;
  onClick?: (event: React.FormEvent) => void;
}

export const PrimaryButton = ({ title, link, isOldUser, onClick }: ButtonProps): ReactElement => {
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
      colorPalette='teal'
      paddingX='20'
      paddingY='4'
      marginTop={isOldUser ? '3.125rem' : '0.625rem'}
      marginBottom={isOldUser ? '6.25rem' : '3.75rem'}
      onClick={primaryButtonHandler}
      asChild
    >
      <a href={link}>{title}</a>
    </Button>
  );
};
