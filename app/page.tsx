"use client";

import { useEffect, useState } from "react";
import QueryBuilder, { formatQuery } from "react-querybuilder";
import type { RuleGroupType } from "react-querybuilder";
import { ClientOnly } from "@/components/ClientOnly";
import { fields } from "@/lib/fields";
import { ControlClassnames } from "@/components/ControlClassnames";
import { getUsers } from "@/lib/actions";
import "@/app/styles.css";

export default function Home() {
  const initialQuery: RuleGroupType = { combinator: "and", rules: [] };
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function getData() {
      try {
        const fetchedData = await getUsers(formatQuery(query, "sql"));
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getData();
  }, [query]);

  return (
    <main className="flex flex-col items-center justify-between p-5">
      <ClientOnly>
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          controlClassnames={ControlClassnames}
        />
      </ClientOnly>
      <div className="pt-10">
        <code>{formatQuery(query, "sql")}</code>
      </div>
      <div>{JSON.stringify(data)}</div>
    </main>
  );
}
