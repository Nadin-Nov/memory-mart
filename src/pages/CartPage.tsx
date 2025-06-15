import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import { cartResponsiveStyles } from '@/theme/theme';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Button,
  Text,
  HStack,
  VStack,
  Separator,
  IconButton,
  Link,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const CartPage = (): ReactElement => {
  const promoApplied = true;
  const cartItems = [
    {
      id: 1,
      name: 'Box of Crayons',
      price: 1299,
      quantity: 2,
      image: '#',
    },
    {
      id: 2,
      name: 'Jar of Summer Rain',
      price: 499,
      quantity: 3,
      image: '#',
    },
  ];

  // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box
      maxWidth='1200px'
      marginX='auto'
      bg='lightBeige.500'
      borderWidth={1}
      borderColor='teal.200'
      rounded='md'
      marginY={8}
      {...cartResponsiveStyles.wrapper}
    >
      <Heading as='h1' size='xs' marginBottom={8} color='darkText.default'>
        Your cart of memories
      </Heading>
      {cartItems.length === 0 ? (
        <Text fontSize='lg' color='darkText.subtle'>
          No memories in cart
          <br />
          <Link href='/catalog'>Would you like to go down the memory lane?</Link>
        </Text>
      ) : (
        <Grid {...cartResponsiveStyles.cartContainer} gap={8}>
          <VStack gap={3} align='stretch' separator={<Separator />}>
            {cartItems.map((item) => (
              <Box key={item.id} padding={4} bg='lightBeige.500' borderRadius='lg' boxShadow='sm'>
                <Grid {...cartResponsiveStyles.itemContainer} gap={6} alignItems='center'>
                  <Image
                    // src={item.variant.images[0].url}
                    // alt={item.variant.images[0].label}
                    objectFit='cover'
                    h='100%'
                    w='100%'
                  />
                  <VStack align='flex-start' gap={2}>
                    <Text color='darkText.default'>{/* {item.name.['en-US']} */}</Text>
                    <Text color='darkText.subtle'>${/* {item.variant.price.value.centAmount} */}</Text>
                  </VStack>

                  <Flex align='center' gap={4}>
                    <HStack gap={2}>
                      <IconButton variant='ghost' size='sm'>
                        <FiMinus color='teal' />
                      </IconButton>
                      <Input
                        // value={item.quantity}
                        type='number'
                        min='1'
                        max='99'
                        width='50px'
                        textAlign='center'
                        readOnly
                      />
                      <IconButton variant='ghost' size='sm'>
                        <FiPlus color='teal' />
                      </IconButton>
                    </HStack>

                    <Text fontWeight='bold' color='darkText.default' minWidth='80px' textAlign='right'>
                      ${/* {subtotal} */}
                    </Text>

                    <IconButton variant='ghost' marginLeft={4}>
                      <FiTrash2 color='teal' />
                    </IconButton>
                  </Flex>
                </Grid>
              </Box>
            ))}
            <PrimaryButton title='Clear all' maxWidth='150px' />
          </VStack>

          <Box padding={6} bg='lightBeige.500' borderRadius='lg' boxShadow='sm' height='fit-content'>
            <VStack gap={4} align='stretch'>
              <Heading as='h2' size='xs' color='darkText.default'>
                Total
              </Heading>
              <VStack gap={4} align='stretch'>
                <Flex justify='space-between'>
                  <Text color='darkText.subtle'>Subtotal</Text>
                  <Text color='darkText.default'>${/* {subtotal} */}</Text>
                </Flex>

                <Flex justify='space-between' fontWeight='bold'>
                  <Text color='darkText.default'>Total</Text>
                  <Text color='darkText.default'>${/* {subtotal} */}</Text>
                </Flex>
              </VStack>
              <VStack gap={4} align='stretch' marginTop={4}>
                <Text color='darkText.default'>Promo Code</Text>
                <HStack>
                  <Input
                    placeholder='Enter promo code'
                    bg='lightBeige.500'
                    borderColor='teal.200'
                    _focus={{ borderColor: 'teal.500' }}
                  />
                  <Button
                    bg='primary.solid'
                    color='primary.contrast'
                    borderRadius={10}
                    _hover={{ bg: 'primary._hover' }}
                  >
                    Apply
                  </Button>
                </HStack>
              </VStack>
              {promoApplied ? (
                <Flex justify='space-between'>
                  <Text color='darkText.subtle'>Discount</Text>
                  <Text color='darkText.default'>${/* {discount} */}</Text>
                </Flex>
              ) : (
                ''
              )}
              <PrimaryButton title='CHECKOUT' />
            </VStack>
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
