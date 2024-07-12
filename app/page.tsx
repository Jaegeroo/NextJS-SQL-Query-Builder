"use client";

import { useState, useEffect } from "react";
import QueryBuilder, { formatQuery } from "react-querybuilder";
import { initialQuery } from "@/lib/initial-query";
import { ClientOnly } from "@/components/client-only";
import { fields } from "@/lib/fields";
import { ControlClassnames } from "@/lib/control-classnames";
import { UsersTable } from "@/components/users-table";
import { getUsers } from "@/lib/actions";
import { UserT } from "@/lib/types";
import { LuTrash2 } from "react-icons/lu";
import "@/app/styles.css";

export default function Home() {
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<UserT[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const fetchedData = await getUsers(formatQuery(query, "sql"));
        // console.log(typeof fetchedData);
        // console.log(fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    getData();
  }, [query]);

  return (
    <main className="mt-5 relative">
      <div className="container">
        <ClientOnly>
          <QueryBuilder
            fields={fields}
            query={query}
            onQueryChange={setQuery}
            controlClassnames={ControlClassnames}
            translations={{
              addRule: { label: "+ Filter" },
              removeRule: { label: <LuTrash2 /> },
              removeGroup: { label: <LuTrash2 /> },
            }}
            showCombinatorsBetweenRules
          />
        </ClientOnly>
        <UsersTable data={data} />
        <div>
          <h1>Query:</h1>
          <code>{formatQuery(query, "sql")}</code>
        </div>
      </div>
    </main>
  );
}
