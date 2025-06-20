import { Box, Image, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';

const MAX_BOTTOM = 300;
const MIN_BOTTOM = 100;
const SCROLL_SPEED_FACTOR = 0.5;
const SMOOTHING = 0.1;

const FlyingGirl = (): JSX.Element => {
  const width = useBreakpointValue({ base: '80px', md: '240px' });

  const [targetBottom, setTargetBottom] = useState<number>(MAX_BOTTOM);
  const currentBottom = useRef<number>(MAX_BOTTOM);
  const [renderedBottom, setRenderedBottom] = useState<number>(MAX_BOTTOM);

  useEffect(() => {
    const handleScroll = (): void => {
      const newTarget: number = Math.max(MIN_BOTTOM, MAX_BOTTOM - window.scrollY * SCROLL_SPEED_FACTOR);
      setTargetBottom(newTarget);
    };

    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const animate = (): void => {
      const delta: number = targetBottom - currentBottom.current;
      currentBottom.current += delta * SMOOTHING;
      setRenderedBottom(currentBottom.current);
      animationFrame = globalThis.requestAnimationFrame(animate);
    };

    animate();

    return (): void => {
      globalThis.cancelAnimationFrame(animationFrame);
    };
  }, [targetBottom]);

  return (
    <Box
      position='fixed'
      right='20px'
      bottom={`${renderedBottom}px`}
      zIndex={100}
      pointerEvents='none'
      width={width}
      userSelect='none'
      transition='width 0.3s ease'
    >
      <Image src='/assets/flying-girl.png' alt='Flying girl' width='100%' height='auto' draggable={false} />
    </Box>
  );
};

export default FlyingGirl;
