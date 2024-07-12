"use client";

import { useEffect, useState } from "react";
import QueryBuilder, { formatQuery, getOption } from "react-querybuilder";
import type {
  RuleGroupType,
  CombinatorSelectorProps,
} from "react-querybuilder";
import { ClientOnly } from "@/components/client-only";
import { fields } from "@/lib/fields";
import { ControlClassnames } from "@/components/control-classnames";
import { UsersTable } from "@/components/users-table";
import { getUsers } from "@/lib/actions";
import { UserT } from "@/lib/types";
import { ThemeToggler } from "@/components/theme/theme-toggler";
import "@/app/styles.css";

export default function Home() {
  const initialQuery: RuleGroupType = { combinator: "and", rules: [] };
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<UserT[]>([]);

  const CombinatorSelector = (props: CombinatorSelectorProps) => (
    // Render static value to prevent combinator updates
    <div className={props.className} title={props.title}>
      {getOption(props.options, props.value!)?.label}
    </div>
  );

  useEffect(() => {
    async function getData() {
      try {
        const fetchedData = await getUsers(formatQuery(query, "sql"));
        console.log(typeof fetchedData);
        console.log(fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getData();
  }, [query]);

  return (
    <main className="container mx-auto mt-5 relative">
      <ClientOnly>
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          controlClassnames={ControlClassnames}
          translations={{
            addRule: { label: "+ Filter" },
          }}
          showCombinatorsBetweenRules
        />
      </ClientOnly>
      <UsersTable data={data} />
      <div>
        <h1>Query:</h1>
        <code>{formatQuery(query, "sql")}</code>
      </div>
      <ThemeToggler />
    </main>
  );
}
