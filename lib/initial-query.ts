import type { RuleGroupType } from "react-querybuilder";

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
