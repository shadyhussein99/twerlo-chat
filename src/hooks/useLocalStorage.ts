import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = <T>(key: string, value?: T) => {
  const initialValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : value;
    } catch (error) {
      console.error("Failed to get initial value from localStorage", error);
      return value;
    }
  }, [key, value]);

  const [storedValue, setStoredValue] = useState<T | undefined>(initialValue());

  const isStored = window.localStorage.getItem(key);

  const setValue = useCallback(
    (value: T | ((val?: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("Failed to write to localStorage", error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(undefined);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to remove from localStorage", error);
    }
  }, [key]);

  // #region effects
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
    }
  }, [key]);

  return { storedValue, setValue, removeValue, isStored };
};
