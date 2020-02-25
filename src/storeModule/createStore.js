import { createContext, useContext } from "react";

/**
 * @template S
 * @typedef {[S, (state: S)=> any]} Store
 */

/**
 * @template D
 * @typedef {object} Additional
 * @property {() => Store<D>} useStore
 * @property {D} state
 * @property {() => void} dispatch
 */

/**
 * @template T
 * @param {object} param0
 * @param {() => any} param0.reducer
 * @param {T} param0.initialState
 * @param {(store: any)=>void} param0.middleware
 * @returns {React.Context<T> & Additional<T>}
 */
export const createStore = ({ reducer, initialState, middleware }) => {
  const context = createContext(initialState);

  Object.assign(context, {
    reducer,
    initialState,
    middleware,
    state: initialState,
    subscription: {},
    useStore: () => [useContext(context), context.dispatch],
    // this is just for test
    dispatch(state) {
      Object.assign(context, { state });
    },
  });

  return context;
};
