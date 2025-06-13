import { footerResponsiveStyles } from '@/theme/theme';
import { Box, Flex, Input, InputGroup, Text, Link } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { FaLongArrowAltRight, FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = (): ReactElement => {
  return (
    <Box as='footer' borderTopColor='gray.200' borderTopWidth='1px'>
      <Flex {...footerResponsiveStyles.container} paddingTop='3.25rem' justify='space-between'>
        <Flex {...footerResponsiveStyles.linkGap}>
          <Link {...footerResponsiveStyles.link} color='gray.500'>
            CONTACT
          </Link>
          <Link {...footerResponsiveStyles.link} color='gray.500'>
            TERMS OF SERVICES
          </Link>
          <Link {...footerResponsiveStyles.link} color='gray.500'>
            SHIPPING AND RETURNS
          </Link>
        </Flex>
        <Flex {...footerResponsiveStyles.inputContainer} width='full' justify='space-between'>
          <InputGroup endElement={<FaLongArrowAltRight fill='#707070' size='1.2rem' />} paddingRight='0px'>
            <Input name='email' placeholder='Give an email, get the newsletter' variant='flushed' />
          </InputGroup>
        </Flex>
      </Flex>
      <Flex paddingTop='2rem' justify='space-between' {...footerResponsiveStyles.container}>
        <Text {...footerResponsiveStyles.link}>
          © 2025 MemoryMart.{' '}
          <Link href='#' color='gray.500'>
            Terms of use
          </Link>{' '}
          and{' '}
          <Link href='#' color='gray.500'>
            privacy policy
          </Link>
        </Text>
        <Flex justify='flex-end' gap='25px'>
          <Link href='#'>
            <FaLinkedinIn fill='#707070' size='1.1rem' />
          </Link>
          <Link href='#'>
            <FaFacebookF fill='#707070' size='1.1rem' />
          </Link>
          <Link href='#'>
            <FaInstagram fill='#707070' size='1.1rem' />
          </Link>
          <Link href='#'>
            <FaTwitter fill='#707070' size='1.1rem' />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
