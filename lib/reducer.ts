import { initialQuery } from "./initial-query";
import { StateType, ActionType } from "./types";

// Initial Reducer State
export const initialReducerState: StateType = {
  showFilter: false,
  query: initialQuery,
  userData: [],
};

// Reducer function
export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_SHOW_FILTER":
      return {
        ...state,
        showFilter: action.payload,
      };
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
