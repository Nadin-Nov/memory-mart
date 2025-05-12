import { VStack, Heading, Flex, Link, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

interface FormWrapperProps {
  name: string;
  linkText: string;
  link: string;
  children: React.ReactElement[];
  isOldUser?: boolean;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  name,
  linkText,
  link,
  children,
  isOldUser,
}): ReactElement => {
  return (
    <Flex align='center' justify='center' h='100vh'>
      <VStack
        borderRadius={20}
        borderWidth='1px'
        paddingX={120}
        paddingY={50}
        maxWidth={748}
        width='full'
        bg='primary.contrast'
      >
        <Heading size='md' color='darkText.subtle' marginBottom={isOldUser ? '6.25rem' : '2.5rem'}>
          {name}
        </Heading>
        <Flex width='full' gap={50} direction='column'>
          {children}
        </Flex>
        <Text>
          {isOldUser ? (
            <Link href={link}>{linkText}</Link>
          ) : (
            <>
              Already have an account? <Link href={link}>{linkText}</Link>
            </>
          )}
        </Text>
      </VStack>
    </Flex>
  );
};
