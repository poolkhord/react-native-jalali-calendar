import * as types from "./types";

export const select = selected => ({
  type: types.SELECT,
  payload: { selected },
});
