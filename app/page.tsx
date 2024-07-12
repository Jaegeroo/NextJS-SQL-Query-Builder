"use client";

import { useState, useEffect } from "react";
import QueryBuilder, { formatQuery, RuleGroupType } from "react-querybuilder";

import { ClientOnly } from "@/components/client-only";
import { UsersTable } from "@/components/users-table";
import { Button } from "@/components/ui/button";

import { initialQuery } from "@/lib/initial-query";
import { getUsers } from "@/lib/actions";
import { fields } from "@/lib/fields";
import { ControlClassnames } from "@/lib/control-classnames";
import { UserT } from "@/lib/types";

import { LuTrash2 } from "react-icons/lu";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

import "@/app/styles.css";

export default function Home() {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [query, setQuery] = useState<RuleGroupType>(initialQuery);
  const [data, setData] = useState<UserT[]>([]);

  useEffect(() => {
    console.log(query);
  }, [query]);

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
        <div className="flex justify-end mb-2">
          <Button variant="ghost" onClick={() => setShowFilter(!showFilter)}>
            {showFilter ? (
              <>
                <MdFilterAltOff className="text-xl mr-2" />
                Hide
              </>
            ) : (
              <>
                <MdFilterAlt className="text-xl mr-2" />
                Show
              </>
            )}
            &nbsp;Filter
          </Button>
        </div>
        {showFilter && (
          <ClientOnly>
            <QueryBuilder
              fields={fields}
              query={query}
              onQueryChange={setQuery}
              controlClassnames={ControlClassnames}
              translations={{
                addRule: {
                  label: (
                    <div className="flex items-center">
                      <IoMdAdd className="mr-1 text-lg" /> Filter
                    </div>
                  ),
                },
                addGroup: {
                  label: (
                    <div className="flex items-center">
                      <IoMdAdd className="mr-1 text-lg" /> Group
                    </div>
                  ),
                },
                removeRule: { label: <LuTrash2 /> },
                removeGroup: { label: <LuTrash2 /> },
              }}
              showCombinatorsBetweenRules
            />
          </ClientOnly>
        )}

        <UsersTable data={data} />
        <div>
          <h1>Query:</h1>
          <code>{formatQuery(query, "sql")}</code>
        </div>
      </div>
    </main>
  );
}
