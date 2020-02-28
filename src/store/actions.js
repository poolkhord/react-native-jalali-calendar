import * as types from "./types";

export const select = selected => ({
  type: types.SELECT,
  payload: { selected },
});

export const addToSelectedYear = count => ({
  type: types.ADD_TO_SELECTED_YEAR,
  payload: { count },
});
