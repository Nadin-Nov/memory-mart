import { Flex, Text } from '@chakra-ui/react';
import { InputField } from '../InputField/InputField';
import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CatalogAside(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Flex
      flexDirection='column'
      textAlign={'left'}
      as='aside'
      width='250px'
      minWidth='250px'
      p={4}
      height='100%'
      position='sticky'
      top='0'
      overflowY='auto'
    >
      <Text mb='1rem' colorPalette={'darkText'}>
        Anything seems familiar?
      </Text>
      <InputField name='search' placeholder='Search' register={register} errors={errors} />
    </Flex>
  );
}
