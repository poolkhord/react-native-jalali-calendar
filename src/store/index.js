import { createStore } from "../storeModule";
import reducer from "./reducers";
import initialState from "./initialState";

export { select } from "./actions";

export const Store = createStore({ reducer, initialState });
