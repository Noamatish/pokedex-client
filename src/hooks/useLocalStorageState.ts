import { useState, useEffect } from "react";

function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? (savedValue as unknown as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, state as unknown as string);
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
