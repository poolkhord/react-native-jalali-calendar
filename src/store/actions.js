import * as types from "./types";
import initialState from "./initialState";

export const select = selected => ({
  type: types.SELECT,
  payload: { selected },
});

export const reset = () => ({
  type: types.RESET,
  payload: initialState,
});
