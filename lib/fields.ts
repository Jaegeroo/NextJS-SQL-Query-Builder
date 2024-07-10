import type { Field, RuleType } from "react-querybuilder";
import { defaultOperators, toFullOption } from "react-querybuilder";

export const validator = (r: RuleType) => !!r.value;

export const fields = (
  [
    {
      name: "firstname",
      label: "First Name",
      placeholder: "Enter first name",
      validator,
    },
    {
      name: "lastname",
      label: "Last Name",
      placeholder: "Enter last name",
      defaultOperator: "beginsWith",
      validator,
    },
    { name: "age", label: "Age", inputType: "number", validator },
    {
      name: "gender",
      label: "Gender",
      operators: defaultOperators.filter((op) => op.name === "="),
      valueEditorType: "select",
      values: [
        { name: "male", label: "Male" },
        { name: "female", label: "Female" },
      ],
    },
    { name: "height", placeholder: "cm", label: "Height", validator },
    { name: "birthdate", label: "Birth Date", inputType: "date" },
  ] satisfies Field[]
).map((o) => toFullOption(o));
