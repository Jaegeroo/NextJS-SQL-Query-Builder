"use client";

import { useEffect, useReducer } from "react";
import QueryBuilder, { formatQuery, RuleGroupType } from "react-querybuilder";

import { ClientOnly } from "@/components/client-only";
import { UsersTable } from "@/components/table/users-table";
import { Button } from "@/components/ui/button";

import { getUsers } from "@/lib/actions";
import { fields } from "@/lib/fields";
import { reducer, initialReducerState } from "@/lib/reducer";
import { ControlClassnames } from "@/lib/control-classnames";

import { LuTrash2 } from "react-icons/lu";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "@/app/styles.css";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialReducerState);
  const { showFilter, query, userData } = state;

  const toggleFilter = () => {
    dispatch({ type: "SET_SHOW_FILTER", payload: !showFilter });
  };

  const setQuery = (newQuery: RuleGroupType) => {
    dispatch({ type: "SET_QUERY", payload: newQuery });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const formattedQuery = formatQuery(query, "sql");
        const fetchedData = await getUsers(formattedQuery);
        dispatch({ type: "SET_USER_DATA", payload: fetchedData });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, [query]);

  return (
    <main className="mt-5 relative">
      <div className="container">
        <div className="flex justify-end mb-2">
          <Button variant="ghost" onClick={toggleFilter}>
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

        <UsersTable data={userData} />
        <div>
          <h1>Query:</h1>
          <code>{formatQuery(query, "sql")}</code>
        </div>
      </div>
    </main>
  );
}
