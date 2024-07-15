import { RuleGroupType } from "react-querybuilder";

// Table type
export type UserT = {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: "male" | "female";
  height: number;
  birthdate: Date;
};

// Reducer action type
export type ActionType =
  | { type: "SET_SHOW_FILTER"; payload: boolean }
  | { type: "SET_QUERY"; payload: RuleGroupType }
  | { type: "SET_USER_DATA"; payload: UserT[] };

// Reducer state type
export type StateType = {
  showFilter: boolean;
  query: RuleGroupType;
  userData: UserT[];
};
