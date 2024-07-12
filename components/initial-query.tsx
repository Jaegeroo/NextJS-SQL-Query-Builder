import type { RuleGroupType } from "react-querybuilder";

export const initialQuery: RuleGroupType = {
  combinator: "and",
  rules: [
    {
      id: "",
      rules: [
        {
          id: "",
          field: "firstname",
          operator: "=",
          valueSource: "value",
          value: "",
        },
      ],
      combinator: "and",
      not: false,
    },
  ],
};
