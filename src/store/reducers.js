import * as types from "./types";
import { createReducer } from "../storeModule";
import { createMonthsList } from "../utils";

export default createReducer({
  [types.SELECT]: (state, { payload: { selected } }) => ({
    ...state,
    selected,
  }),
  [types.ADD_TO_SELECTED_YEAR]: (state, { payload: { count } }) => {
    const newYear = state.selectedYear + count;
    return {
      ...state,
      selectedYear: newYear,
      months: createMonthsList(newYear),
    };
  },
});
