import { Button } from '@chakra-ui/react';
import type { ReactElement } from 'react';

export interface ButtonProps {
  title: string;
  externalLink?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: (event: React.FormEvent) => void;
}

export const PrimaryButton = ({ title, externalLink, type = 'button', onClick }: ButtonProps): ReactElement => {
  const primaryButtonHandler = (event: React.FormEvent): void => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  if (externalLink) {
    return (
      <a href={externalLink}>
        <Button
          type={type}
          borderRadius={10}
          width='full'
          colorPalette='teal'
          paddingX='20'
          paddingY='4'
          onClick={primaryButtonHandler}
          asChild
        >
          {title}
        </Button>
      </a>
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
      asChild
    >
      {title}
    </Button>
  );
};
