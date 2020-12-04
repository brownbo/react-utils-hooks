import { EffectCallback, SetStateAction, Dispatch, DependencyList } from "react";
export declare function usePrevious<T>(value: T): T | undefined;
export declare function useIsMounted(): boolean;
export declare function useDidMount(fn: EffectCallback): void;
export declare function useWillMount(fn: EffectCallback): void;
export declare function useDidUpdate(fn: EffectCallback, deps?: DependencyList): void;
export declare function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export declare function useLegacyState<S extends {
    [key: string]: any;
}>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<Partial<S>>>];
export declare function useToggler(initialState: boolean): [boolean, () => void];
export declare function useWillUnmount(fn: EffectCallback): void;
