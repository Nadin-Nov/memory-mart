import type { ReactElement } from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface ButtonProps {
  title: string;
  link: string;
  onClick?: (event: React.FormEvent) => void;
}

export const PrimarySpaButton = ({ title, link, onClick }: ButtonProps): ReactElement => {
  const navigate = useNavigate();

  const primaryButtonHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    if (onClick) onClick(event);
    void navigate(link);
  };

  return (
    <Button
      type='submit'
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
