import { createStore } from "../storeModule";
import reducer from "./reducers";
import initialState from "./initialState";
import * as reducerTypes from "./types";
export * from "./actions";

const StoreCalendar = createStore({ reducer, initialState });

export { reducerTypes, StoreCalendar };
