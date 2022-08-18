import { useEffect, useRef, useState } from "react";
import emitter from "../Utils/eventEmitter";

export const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState) =>
    setState((prevState) => {
      const expectedState = Object.assign(prevState, newState);
      return { ...expectedState };
    });
  return [state, setMergedState];
};

export const useUpdateEffect = (effect, dependencies = [], cleanup) => {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
    return cleanup;
  }, dependencies);
};

export const useEmitter = (key, callback, deps) => {
  useEffect(() => {
    if (!(key && callback)) {
      return;
    }
    const listener = emitter.addListener(key, callback);
    return () => {
      listener.remove();
    };
  }, [key, ...deps]);
  return emitter;
};
