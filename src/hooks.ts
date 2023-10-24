import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useState, useEffect } from 'react';
import { createToast } from './utils/toasts';
import type { RootState, AppDispatch } from './store';
import { defaultDelay } from './constants';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

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
};

export const useShowErrorToast = (error: FetchBaseQueryError | SerializedError | undefined) => {
  useEffect(() => {
    if (error && 'status' in error) {
      createToast.error(error.data, error.status);
    }
  }, [error]);
};
