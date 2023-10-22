import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState, AppDispatch } from './store';
import { defaultDelay } from './constants';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      delay || defaultDelay
    );

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
