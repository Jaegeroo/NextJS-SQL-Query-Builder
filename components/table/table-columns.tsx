import { ColumnDef } from "@tanstack/react-table";
import { UserT } from "@/lib/types";

export const columns: ColumnDef<UserT>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstname",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstname")}</div>
    ),
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastname")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <div>{row.getValue("age")}</div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gender")}</div>
    ),
  },
  {
    accessorKey: "height",
    header: "Height",
    cell: ({ row }) => <div className="">{row.getValue("height")} cm</div>,
  },
  {
    accessorKey: "birthdate",
    header: "Birthdate",
    cell: ({ row }) => {
      const birthdate = new Date(row.getValue("birthdate"));
      const formattedDate = birthdate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <div className="capitalize">{formattedDate}</div>;
    },
  },
];
