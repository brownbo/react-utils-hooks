import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { isFunction } from "lodash";

export function usePrevious(value) {
  const ref = useRef();
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

export function useDidMount(fn) {
  useEffect(fn, []);
}

export function useWillMount(fn) {
  useMemo(fn, []);
}

export function useDidUpdate(fn, deps = []) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      fn();
    } else {
      isMounted.current = true;
    }
  }, deps);
}

export function useSafeState(initialState) {
  const [state, setState] = useState(initialState);
  const isMounted = useRef(false);

  const setSafeState = useCallback((value) => {
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

export function useLegacyState(initialState) {
  const [state, setState] = useSafeState(initialState);

  const setLegacyState = useCallback((value) => {
    setState((prev) => {
      const newState = isFunction(value) ? value(prev) : value;
      return { ...prev, ...newState };
    });
  }, []);

  return [state, setLegacyState];
}
