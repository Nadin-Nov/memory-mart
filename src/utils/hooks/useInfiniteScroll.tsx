import { useCallback, useEffect, useRef } from 'react';

export function useInfiniteScroll(callback: () => Promise<void>): React.RefObject<null> {
  const observerReference = useRef<IntersectionObserver | null>(null);
  const bottomReference = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) void callback();
    },
    [callback]
  );

  useEffect(() => {
    if (observerReference.current) observerReference.current.disconnect();

    observerReference.current = new IntersectionObserver(handleObserver, {
      rootMargin: '200px',
    });

    if (bottomReference.current) {
      observerReference.current.observe(bottomReference.current);
    }

    return (): void => {
      if (observerReference.current) observerReference.current.disconnect();
    };
  }, [handleObserver]);

  return bottomReference;
}
