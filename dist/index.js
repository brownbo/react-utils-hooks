"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLegacyState = exports.useSafeState = exports.useDidUpdate = exports.useWillMount = exports.useDidMount = exports.useIsMounted = exports.usePrevious = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
function usePrevious(value) {
    var ref = react_1.useRef();
    react_1.useEffect(function () {
        ref.current = value;
    });
    return ref.current;
}
exports.usePrevious = usePrevious;
function useIsMounted() {
    var isMounted = react_1.useRef(false);
    react_1.useEffect(function () {
        isMounted.current = true;
        return function () {
            isMounted.current = false;
        };
    }, []);
    return isMounted.current;
}
exports.useIsMounted = useIsMounted;
function useDidMount(fn) {
    react_1.useEffect(fn, []);
}
exports.useDidMount = useDidMount;
function useWillMount(fn) {
    react_1.useMemo(fn, []);
}
exports.useWillMount = useWillMount;
function useDidUpdate(fn, deps) {
    if (deps === void 0) { deps = []; }
    var isMounted = react_1.useRef(false);
    react_1.useEffect(function () {
        if (isMounted.current) {
            fn();
        }
        else {
            isMounted.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
exports.useDidUpdate = useDidUpdate;
function useSafeState(initialState) {
    var _a = react_1.useState(initialState), state = _a[0], setState = _a[1];
    var isMounted = react_1.useRef(false);
    var setSafeState = react_1.useCallback(function (value) {
        if (isMounted.current) {
            setState(value);
        }
    }, []);
    react_1.useEffect(function () {
        isMounted.current = true;
        return function () {
            isMounted.current = false;
        };
    }, []);
    return [state, setSafeState];
}
exports.useSafeState = useSafeState;
function useLegacyState(initialState) {
    var _a = useSafeState(initialState), state = _a[0], setState = _a[1];
    var setLegacyState = react_1.useCallback(function (value) {
        setState(function (prev) {
            var newState = lodash_1.isFunction(value) ? value(prev) : value;
            return __assign(__assign({}, prev), newState);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return [state, setLegacyState];
}
exports.useLegacyState = useLegacyState;
