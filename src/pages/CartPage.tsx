import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import { useAuth } from '@/context/useAuth';
import { applyPromoCode, changeLineItemQuantity, clearCart, getActiveCart } from '@/services/CartService';
import { cartResponsiveStyles } from '@/theme/theme';
import type { Cart, LineItem } from '@/types/cart';
import { addToast } from '@/utils/addToast';
import { CartPortal } from '@/components/CartPortal/CartPortal';
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
import { useEffect, useState, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const cents = 100;
const symb = 2;

const CartPage = (): ReactElement => {
  const { userData, refreshCartItemCount } = useAuth();
  const [cart, setCart] = useState<Cart | undefined>();
  const [cartItems, setCartItems] = useState<LineItem[] | undefined>();
  const [cartTotal, setCartTotal] = useState<number | undefined>(0);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoAmount, setPromoAmount] = useState<number | undefined>(0);
  const [promoCode, setPromoCode] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.token) {
      const fetchActiveCart = async (): Promise<void> => {
        const cart = await getActiveCart(userData?.token);
        setCart(cart);
        setCartItems(cart?.lineItems);
        setCartTotal(cart?.totalPrice.centAmount);
      };
      fetchActiveCart();
    }
  }, [userData]);

  if (!cartItems) {
    return <LoadingSpinner />;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price.value.centAmount * item.quantity, 0);
  const cartTotalToFixed = cartTotal ? (cartTotal / cents).toFixed(symb) : 0;
  const promoAmountToFixed = promoAmount ? (promoAmount / cents).toFixed(symb) : 0;

  const handleRemoveItem = async (item: LineItem): Promise<void> => {
    if (userData && cart) {
      try {
        const newCart = await changeLineItemQuantity(
          userData?.token,
          cart?.id,
          cart?.version,
          item.id,
          item.quantity - 1
        );
        setCart(newCart);
        setCartItems(newCart?.lineItems);
        setCartTotal(newCart?.totalPrice.centAmount);
        refreshCartItemCount?.();
      } catch (error) {
        console.log('Failed to remove item', error);
      }
    }
  };

  const handleAddItem = async (item: LineItem): Promise<void> => {
    if (userData && cart) {
      try {
        const newCart = await changeLineItemQuantity(userData.token, cart.id, cart.version, item.id, item.quantity + 1);
        setCart(newCart);
        setCartItems(newCart?.lineItems);
        setCartTotal(newCart?.totalPrice.centAmount);
        refreshCartItemCount?.();
      } catch (error) {
        console.log('Failed to add item', error);
      }
    }
  };

  const handleDeleteItem = async (item: LineItem): Promise<void> => {
    if (userData && cart) {
      try {
        const newCart = await changeLineItemQuantity(userData.token, cart.id, cart.version, item.id, 0);
        setCart(newCart);
        setCartItems(newCart?.lineItems);
        setCartTotal(newCart?.totalPrice.centAmount);
        refreshCartItemCount?.();
      } catch (error) {
        console.log('Failed to delete item', error);
      }
    }
  };

  const handlePromoCode = async (promo: string): Promise<Cart | undefined> => {
    if (userData?.token && cart?.id) {
      try {
        const cartAfterPromo = await applyPromoCode(userData.token, cart?.id, cart?.version, promo);
        setCartTotal(cartAfterPromo?.totalPrice.centAmount);
        setPromoApplied(true);
        setPromoAmount(cartAfterPromo?.discountOnTotalPrice?.discountedAmount.centAmount);
        setPromoCode('');
        addToast('success', 'Promo code applied', 'Just made your own magic!');
      } catch (error) {
        addToast('error', 'Promo not applied', 'Something went wrong');
        console.error('Failed to apply promo', error);
        return;
      }
    }
  };

  const handleClearAll = async (): Promise<void> => {
    const itemIds = cartItems.map((item) => item.id);
    if (userData?.token && cart?.id) {
      try {
        const updatedCart = await clearCart(userData.token, cart.id, cart.version, itemIds);
        setCart(updatedCart);
        setCartItems(updatedCart?.lineItems);
        setPromoApplied(false);
        refreshCartItemCount?.();
        addToast('success', 'Your cart of memories is empty', 'Would you like shop for more?');
        setShowModal(false);
        addToast('success', 'Your cart of memories is empty', 'Would you like shop for more?');
      } catch (error) {
        console.error('Failed to clear cart:', error);
        addToast('error', "Can't clear your cart", 'Something went wrong');
      }
    }
  };

  const handleConfirmClear = (): void => {
    setShowModal(true);
  };

  const handleCancelClear = (): void => {
    setShowModal(false);
  };

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
        <VStack justify='center' gap={6}>
          <Text fontSize='lg' color='darkText.subtle'>
            No memories in cart
          </Text>
          <Image
            src='/assets/Cart_Girl.webp'
            alt='Girl'
            objectFit='cover'
            maxH='200px'
            maxW='150px'
            h='100%'
            w='100%'
            textAlign='center'
          />
          <Link onClick={() => void navigate('/catalog')}>Would you like to walk down the memory lane?</Link>
        </VStack>
      ) : (
        <Grid {...cartResponsiveStyles.cartContainer} gap={8}>
          <VStack gap={3} align='stretch' separator={<Separator />}>
            {cartItems.map((item) => (
              <Box key={item.id} padding={4} bg='lightBeige.500' borderRadius='lg' boxShadow='sm'>
                <Grid {...cartResponsiveStyles.itemContainer} gap={6} alignItems='center' justifyItems='flex-start'>
                  <Image
                    src={item.variant.images[0].url}
                    alt={item.variant.images[0].label}
                    objectFit='cover'
                    maxH='150px'
                    maxW='150px'
                    h='100%'
                    w='100%'
                  />
                  <VStack align='flex-start' gap={2}>
                    <Text color='darkText.default' textAlign='left'>
                      {item.name['en-US']}{' '}
                    </Text>
                    <Text color='darkText.subtle'>${(item.price.value.centAmount / cents).toFixed(symb)}</Text>
                  </VStack>

                  <Flex align='center' gap={4}>
                    <HStack gap={2}>
                      <IconButton variant='ghost' size='sm' onClick={() => void handleRemoveItem(item)}>
                        <FiMinus color='teal' />
                      </IconButton>
                      <Input
                        value={item.quantity}
                        type='number'
                        min='0'
                        max='99'
                        width='50px'
                        textAlign='center'
                        paddingX='0'
                        readOnly
                      />
                      <IconButton variant='ghost' size='sm' onClick={() => void handleAddItem(item)}>
                        <FiPlus color='teal' />
                      </IconButton>
                    </HStack>

                    <Text fontWeight='bold' color='darkText.default' minWidth='80px' textAlign='right'>
                      ${(item.totalPrice.centAmount / cents).toFixed(symb)}
                    </Text>

                    <IconButton variant='ghost' marginLeft={4} onClick={() => void handleDeleteItem(item)}>
                      <FiTrash2 color='teal' />
                    </IconButton>
                  </Flex>
                </Grid>
              </Box>
            ))}
            <PrimaryButton title='Clear all' maxWidth='150px' onClick={handleConfirmClear} />
          </VStack>

          {showModal &&
            createPortal(
              <CartPortal
                onConfirm={() => handleClearAll()}
                onCancel={handleCancelClear}
                message='Are you sure you want to clear your cart?'
              />,
              document.body
            )}

          <Box padding={6} bg='lightBeige.500' borderRadius='lg' boxShadow='sm' height='fit-content'>
            <VStack gap={4} align='stretch'>
              <Heading as='h2' size='xs' color='darkText.default'>
                Total
              </Heading>
              <VStack gap={4} align='stretch'>
                <Flex justify='space-between'>
                  <Text color='darkText.subtle'>Subtotal</Text>
                  <Text color='darkText.default'>${(subtotal / cents).toFixed(symb)}</Text>
                </Flex>

                <Flex justify='space-between' fontWeight='bold'>
                  <Text color='darkText.default'>Total</Text>
                  <Text color='darkText.default'>${cartTotalToFixed}</Text>
                </Flex>
              </VStack>
              <VStack gap={4} align='stretch' marginTop={4}>
                <Text color='darkText.default'>Promo Code</Text>
                <HStack>
                  <Input
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value.trim())}
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
                    onClick={() => void handlePromoCode(promoCode as string)}
                  >
                    Apply
                  </Button>
                </HStack>
              </VStack>
              {promoApplied && (
                <Flex justify='space-between'>
                  <Text color='darkText.subtle'>Discount</Text>
                  <Text color='darkText.default'>${promoAmountToFixed}</Text>
                </Flex>
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
