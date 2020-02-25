import { createStore } from "../storeModule";
import reducer from "./reducers";
import initialState from "./initialState";
import * as reducerTypes from "./types";
import { select } from "./actions";

const Store = createStore({ reducer, initialState });

export { select, reducerTypes, Store };
