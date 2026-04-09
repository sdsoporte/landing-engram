'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';
import { registerNeuralTarget, unregisterNeuralTarget, subscribeToGlobalUpdates } from '@/lib/neural-targets';

export function useNeuralTarget<T extends HTMLElement = HTMLElement>(
  id: string,
  range = 220
): [React.RefObject<T | null>, MotionValue<number>] {
  const ref = useRef<T>(null);
  const fallbackMotion = useRef(new MotionValue(1000)).current;
  const [motion, setMotion] = useState<MotionValue<number>>(fallbackMotion);

  useEffect(() => {
    if (!ref.current) return;
    setMotion(registerNeuralTarget(id, ref.current, range));

    const unsubscribe = subscribeToGlobalUpdates();

    return () => {
      unsubscribe();
      unregisterNeuralTarget(id);
    };
  }, [id, range]);

  return [ref, motion];
}
