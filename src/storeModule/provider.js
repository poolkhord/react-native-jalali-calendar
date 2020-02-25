import React, { useReducer } from "react";

/**
 * @type {React.FC<{store: any}}>}
 */
export const Provider = ({ children, store }) => {
  const { reducer, initialState, middleware } = store;
  const [state, dispatch] = useReducer(reducer, initialState);
  store.state = state;
  store.dispatch = dispatch;

  middleware && middleware({ state, initialState });

  Object.values(store.subscription).forEach(({ onStateChange }) => {
    onStateChange?.();
  });

  return <store.Provider value={state} children={children} />;
};
