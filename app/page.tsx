"use client";

import { useState } from "react";
import QueryBuilder, { formatQuery } from "react-querybuilder";
import type { RuleGroupType } from "react-querybuilder";
import { fields } from "@/lib/fields";
import "./styles.css"

const initialQuery: RuleGroupType = { combinator: "and", rules: [] };

export default function Home() {
  const [query, setQuery] = useState(initialQuery);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={setQuery}
        controlClassnames={{
          queryBuilder: "queryBuilder-branches bg-background",
          header:"bg-background",
          ruleGroup: "bg-background",
          body: "bg-background",
          addRule:
            "ml-auto p-2.5 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90",
          addGroup:
            "p-2.5 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90",
          operators:
            "w-[auto] rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 [&>span]:line-clamp-1",
          fields:
            "w-[auto] rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 [&>span]:line-clamp-1",
          value:
            "w-[auto] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
          combinators:
            "rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 [&>span]:line-clamp-1",
          removeRule:
            "rounded-md text-3xl px-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
          removeGroup:
            "rounded-md text-3xl px-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground",
          valueSource:
            "rounded-md border border-input bg-background px-1 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 [&>span]:line-clamp-1",
        }}
      />
      <pre>
        <code>{formatQuery(query, "sql")}</code>
      </pre>
    </main>
  );
}
