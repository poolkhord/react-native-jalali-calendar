import * as types from "./types";
import { createReducer } from "../storeModule";

export default createReducer({
  [types.SELECT]: (state, { payload: { selected } }) => ({
    ...state,
    selected,
  }),
});
