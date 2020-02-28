import React, {
  useReducer,
  useMemo,
  useCallback,
  useImperativeHandle,
  forwardRef,
  memo,
} from "react";

/**
 * @type {React.FC<{store: any,dispatchListener:()=> void}}>}
 */
export const Provider = memo(
  forwardRef(({ children, store, dispatchListener }, ref) => {
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

    useImperativeHandle(
      ref,
      () => ({
        state,
        dispatch: dispatchWrapper,
      }),
      [dispatchWrapper, state],
    );

    const value = useMemo(() => {
      return [state, dispatchWrapper];
    }, [state, dispatchWrapper]);

    return <store.Provider value={value} children={children} />;
  }),
);
