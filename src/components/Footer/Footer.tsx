import { footerResponsiveStyles } from '@/theme/theme';
import { Box, Flex, Input, InputGroup, Text, Link } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { FaLongArrowAltRight, FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = (): ReactElement => {
  return (
    <Box as='footer' borderTopColor='gray.200' borderTopWidth='1px'>
      <Flex {...footerResponsiveStyles.container} paddingTop='3.25rem' justify='space-between'>
        <Flex {...footerResponsiveStyles.linkGap}>
          <Link {...footerResponsiveStyles.link} href='/about-us' color='gray.500'>
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
          <Link href='https://www.linkedin.com/'>
            <FaLinkedinIn fill='#707070' size='1.1rem' />
          </Link>
          <Link href='https://www.facebook.com/'>
            <FaFacebookF fill='#707070' size='1.1rem' />
          </Link>
          <Link href='https://www.instagram.com/'>
            <FaInstagram fill='#707070' size='1.1rem' />
          </Link>
          <Link href='https://x.com/'>
            <FaXTwitter fill='#707070' size='1.1rem' />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
