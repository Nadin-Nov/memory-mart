import { VStack, Heading, Flex, Link, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

interface FormWrapperProps {
  name: string;
  linkText: string;
  link: string;
  children: React.ReactElement[];
  isLogin?: boolean;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ name, linkText, link, children, isLogin }): ReactElement => {
  return (
    <Flex align='center' justify='center' h='100vh'>
      <VStack
        gap={50}
        borderRadius={20}
        borderWidth={1}
        paddingX={120}
        paddingY={50}
        maxWidth={748}
        width='full'
        bgColor='lightBeige.500'
      >
        <Heading size='md' color='darkText.subtle'>
          {name}
        </Heading>
        <Flex width='full' gap={50} direction='column'>
          {children}
        </Flex>
        <Text>
          {isLogin ? (
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
