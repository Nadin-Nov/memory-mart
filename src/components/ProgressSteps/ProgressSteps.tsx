import { Box, Steps } from '@chakra-ui/react';
import type { ReactElement } from 'react';

const steps = [
  {
    title: 'Step 1',
    description: 'Credentials',
  },
  {
    title: 'Step 2',
    description: 'Personal info',
  },
  {
    title: 'Step 3',
    description: 'Shipping address',
  },
  {
    title: 'Step 4',
    description: 'Billing address',
  },
];

interface Props {
  step: number;
}

export default function ProgressSteps({ step = 0 }: Props): ReactElement {
  return (
    <Steps.Root count={steps.length} colorPalette='progressSteps' step={step} variant='subtle'>
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title}>
            <Steps.Indicator />
            <Box>
              <Steps.Title>{step.description}</Steps.Title>
            </Box>
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  );
}
