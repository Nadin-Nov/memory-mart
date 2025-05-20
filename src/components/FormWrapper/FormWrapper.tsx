import { VStack, Heading, Flex, Link, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

interface FormWrapperProps {
  name: string;
  linkText: string;
  link: string;
  children: React.ReactElement[];
  isLogin?: boolean;
  onSubmit?: React.FormEventHandler;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  name,
  linkText,
  link,
  children,
  isLogin,
}): ReactElement => {
  return (
    <Flex align='center' justify='center' minH={'650px'}>
      <VStack
        as='form'
        onSubmit={onSubmit}
        gap={50}
        borderRadius={20}
        borderWidth={1}
        paddingX='clamp(30px, 10vw, 150px)'
        paddingY={50}
        maxWidth={748}
        width='calc(100% - 3rem)'
        bgColor='lightBeige.500'
      >
        <Heading size={{ base: 'xs', sm: 'sm', md: 'md' }} color='darkText.subtle'>
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
