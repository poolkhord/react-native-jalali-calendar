import React, { useReducer } from "react";

/**
 * @type {React.FC<{store: any,dispatchListener:()=> void}}>}
 */
export const Provider = ({ children, store, dispatchListener }) => {
  const { reducer, initialState, middleware } = store;
  const [state, dispatch] = useReducer(reducer, initialState);
  store.state = state;

  store.dispatch = (...arg) => {
    dispatch(...arg);
    dispatchListener?.(...arg);
  };

  middleware && middleware({ state, initialState });

  Object.values(store.subscription).forEach(({ onStateChange }) => {
    onStateChange?.();
  });

  return <store.Provider value={state} children={children} />;
};
