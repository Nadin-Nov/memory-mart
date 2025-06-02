import { Flex } from '@chakra-ui/react';
import { InputField } from '../InputField/InputField';
import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { RangeSlider } from '../Slider/Slider';
import { SelectField } from '../SelectField/SelectField';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';

export default function CatalogAside(): ReactElement {
  const {
    register,
    formState: { errors },
    control,
    reset,
  } = useFormContext();

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price asc' },
    { label: 'Price: High to Low', value: 'price desc' },
    { label: 'Name: A to Z', value: 'name.en-US asc' },
    { label: 'Name: Z to A', value: 'name.en-US desc' },
  ];

  const moodOptions = [
    { label: 'Something warm', value: 'something-warm' },
    { label: 'A little escape', value: 'little-escape' },
    { label: 'Just something beautiful', value: 'just-beautiful' },
    { label: 'Something silly', value: 'something-silly' },
    { label: 'A reminder it’ll be okay', value: 'reminder-ok' },
    { label: 'A strange delight', value: 'strange-delight' },
  ];

  const sizeOptions = [
    { label: 'Micro', value: 'micro' },
    { label: 'Regular', value: 'regular' },
    { label: 'Large', value: 'large' },
  ];

  const materialOptions = [
    { label: 'Textile', value: 'textile' },
    { label: 'Paper-based', value: 'paper-based' },
    { label: 'Visual', value: 'visual' },
    { label: 'Audible', value: 'audible' },
    { label: 'Warm to the touch', value: 'warm-touch' },
  ];

  const MIN_PRICE = 0;
  const MAX_PRICE = 150;

  const handleReset = (): void => {
    reset({
      search: '',
      priceRange: [MIN_PRICE, MAX_PRICE],
      sortBy: [''],
      mood: [''],
      size: [''],
      material: [''],
    });
  };

  return (
    <Flex
      flexDirection='column'
      textAlign={'left'}
      as='aside'
      width={{ base: '150px', md: '250px' }}
      minWidth={{ base: '150px', md: '250px' }}
      p={4}
      height='100%'
      position='sticky'
      top='0'
      gap={'20px'}
    >
      <InputField name='search' placeholder='Search' register={register} errors={errors} />
      <RangeSlider name='priceRange' control={control} min={0} max={150} step={1} />
      <SelectField name='sortBy' label='Sort by' placeholder='Select sorting' options={sortOptions} control={control} />
      <SelectField name='mood' label='Mood' placeholder='Mood' options={moodOptions} control={control} />
      <SelectField name='size' label='Size' placeholder='Size' options={sizeOptions} control={control} />
      <SelectField
        name='material'
        label='Material'
        placeholder='Material'
        options={materialOptions}
        control={control}
      />

      <PrimaryButton onClick={handleReset} title='Reset' />
    </Flex>
  );
}
