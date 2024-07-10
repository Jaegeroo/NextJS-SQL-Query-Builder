"use client";

import { useState } from "react";
import QueryBuilder, { formatQuery } from "react-querybuilder";
import type { RuleGroupType } from "react-querybuilder";
import { ClientOnly } from "@/components/ClientOnly";
import { fields } from "@/lib/fields";
import { ControlClassnames } from "@/components/ControlClassnames";
import "@/app/styles.css";

export default function Home() {
  const initialQuery: RuleGroupType = { combinator: "and", rules: [] };
  const [query, setQuery] = useState(initialQuery);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <ClientOnly>
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          controlClassnames={ControlClassnames}
        />
      </ClientOnly>
      <div>{formatQuery(query, "sql")}</div>
    </main>
  );
}
