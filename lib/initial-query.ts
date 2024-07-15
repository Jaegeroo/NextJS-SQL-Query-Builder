import type { RuleGroupType } from "react-querybuilder";

// Define initial query
export const initialQuery: RuleGroupType = {
  combinator: "",
  rules: [
    {
      rules: [],
      combinator: "and",
      not: false,
    },
  ],
};
