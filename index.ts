import {
  useEffect,
  useState,
  useRef,
  useCallback,
  EffectCallback,
  SetStateAction,
  Dispatch,
  useMemo,
  DependencyList,
} from "react";
import { isFunction } from "lodash";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
}

export function useDidMount(fn: EffectCallback) {
  useEffect(fn, []);
}

export function useWillMount(fn: EffectCallback) {
  useMemo(fn, []);
}

export function useDidUpdate(fn: EffectCallback, deps: DependencyList = []) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      fn();
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useSafeState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const isMounted = useRef(false);

  const setSafeState = useCallback((value: SetStateAction<S>) => {
    if (isMounted.current) {
      setState(value);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return [state, setSafeState];
}

export function useLegacyState<S extends { [key: string]: any }>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<Partial<S>>>] {
  const [state, setState] = useSafeState(initialState);
  const setLegacyState = useCallback((value: SetStateAction<Partial<S>>) => {
    setState((prev: S) => {
      const newState = isFunction(value) ? value(prev) : value;
      return { ...prev, ...newState };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setLegacyState];
}

export function useToggler(initialState: boolean) {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggleValue];
}

export function useWillUnmount(fn: EffectCallback) {
  useEffect(
    () => () => {
      fn();
    },
    []
  );
}
