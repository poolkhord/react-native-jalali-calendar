import { createContext, useContext } from "react";
/**
 * @template S
 * @typedef {object} Store
 * @property {() => S} useState
 * @property {() => (state: S) => void} useDispatch
 */

/**
 * @template T
 * @typedef {({state: T, initialState: T}) => void} Middleware
 */

/**
 * @template S
 * @typedef {object} PrivateStore
 * @property {() => S} useState
 * @property {import("react").Context<S>} stateContext
 * @property {import("react").Context<() => void>} dispatchContext
 * @property {() => any} reducer
 * @property {S} initialState
 * @property {Middleware<S>} middleware
 *
 */

/**
 * @template T
 * @param {object} param0
 * @param {() => any} param0.reducer
 * @param {T} param0.initialState
 * @param {Middleware<T>} param0.middleware
 * @returns {Store<T>}
 */
export const createStore = ({ reducer, initialState, middleware }) => {
  const stateContext = createContext(initialState);
  const dispatchContext = createContext(initialState);

  /**@type {PrivateStore<T>} */
  const store = {
    stateContext,
    dispatchContext,
    reducer,
    initialState,
    middleware,
    useState: () => useContext(stateContext),
    useDispatch: () => useContext(dispatchContext),
  };

  return store;
};
