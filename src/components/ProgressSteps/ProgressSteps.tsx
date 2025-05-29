import { Heading, Steps, useBreakpointValue } from '@chakra-ui/react';
import type { ReactElement } from 'react';

interface Step {
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
  step?: number;
}

export default function ProgressSteps({ steps, step = 0 }: Props): ReactElement {
  const showSeparator = useBreakpointValue({ base: false, sm: true });

  return (
    <Steps.Root count={steps.length} colorPalette='progressSteps' step={step} size={{ base: 'xs', md: 'md', lg: 'lg' }}>
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} title={step.title}>
            <Steps.Indicator />
            {showSeparator ? <Steps.Separator /> : <></>}
          </Steps.Item>
        ))}
      </Steps.List>

      {steps.map((step, index) => (
        <Steps.Content key={index} index={index} mt='1rem'>
          <Heading size={{ base: 'xs', sm: 'sm', md: 'md' }}>{step.description}</Heading>
        </Steps.Content>
      ))}
    </Steps.Root>
  );
}
