import React, { useReducer, useMemo, useCallback } from "react";

/**
 * @type {React.FC<{store: any,dispatchListener:()=> void}}>}
 */
export const Provider = ({ children, store, dispatchListener }) => {
  const { reducer, initialState, middleware } = store;
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWrapper = useCallback(
    (...arg) => {
      dispatch(...arg);
      dispatchListener?.(...arg);
    },
    [dispatchListener],
  );

  middleware && middleware({ state, initialState });

  const value = useMemo(() => {
    return [state, dispatchWrapper];
  }, [state, dispatchWrapper]);

  return <store.Provider value={value} children={children} />;
};
