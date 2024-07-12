import type { RuleGroupType } from "react-querybuilder";

export const initialQuery: RuleGroupType = {
  combinator: "and",
  rules: [
    {
      rules: [],
      combinator: "and",
      not: false,
    },
  ],
};
