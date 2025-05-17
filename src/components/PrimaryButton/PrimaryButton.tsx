import { Button } from '@chakra-ui/react';
import type { ReactElement } from 'react';

export interface ButtonProps {
  title: string;
  link?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: (event: React.FormEvent) => void;
}

export const PrimaryButton = ({ title, link, type = 'button', onClick }: ButtonProps): ReactElement => {
  const primaryButtonHandler = (event: React.FormEvent): void => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  if (link) {
    return (
      <Button
        asChild
        type={type}
        borderRadius={10}
        width='full'
        colorPalette='teal'
        paddingX='20'
        paddingY='4'
        onClick={primaryButtonHandler}
      >
        <a href={link}>{title}</a>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      borderRadius={10}
      width='full'
      colorPalette='teal'
      paddingX='20'
      paddingY='4'
      onClick={primaryButtonHandler}
    >
      {title}
    </Button>
  );
};
