'use client';
import { Text, Box } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Range, getTrackBackground } from 'react-range';

type RangeSliderProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  min?: number;
  max?: number;
  step?: number;
};

type RangeTuple = [number, number];

const MAX_DEFAULT = 1000;
const STEP_DEFAULT = 10;
const ARRAY_LENGTH = 2;

export const RangeSlider = ({
  name,
  control,
  min = 0,
  max = MAX_DEFAULT,
  step = STEP_DEFAULT,
}: RangeSliderProps): ReactElement => {
  const {
    field: { value = [min, max] as RangeTuple, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <Box>
      <Text mb={3} color='darkText' fontSize={'sm'}>
        Price range
      </Text>
      <Range
        values={value}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <Box
            {...props}
            height='6px'
            bg={getTrackBackground({
              values: value,
              colors: ['#ccc', '#4dbaca', '#ccc'],
              min,
              max,
            })}
            borderRadius='md'
            width={'90%'}
            ml={'1.5'}
          >
            {children}
          </Box>
        )}
        renderThumb={({ props }) => {
          const { key, ...rest } = props;
          return (
            <Box
              key={key}
              {...rest}
              height='15px'
              width='15px'
              bg='#4dbaca'
              borderRadius='full'
              boxShadow='md'
              _focus={{
                outline: 'none',
                boxShadow: '0 0 0 2px #eeede1',
              }}
            />
          );
        }}
      />
      <Text mt={3} color='darkText.subtle' fontSize={'sm'}>
        {Array.isArray(value) && value.length === ARRAY_LENGTH ? `$${value[0]} – $${value[1]}` : '$0 – $0'}
      </Text>
    </Box>
  );
};
