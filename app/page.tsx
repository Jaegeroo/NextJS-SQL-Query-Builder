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
  // Use useReducer for state management
  const [state, dispatch] = useReducer(reducer, initialReducerState);
  const { showFilter, query, userData } = state;

  // Toggle the visibility of the filter
  const toggleFilter = () => {
    dispatch({ type: "SET_SHOW_FILTER", payload: !showFilter });
  };

  // Update the query state
  const setQuery = (newQuery: RuleGroupType) => {
    dispatch({ type: "SET_QUERY", payload: newQuery });
  };

  // Fetch data whenever the query changes
  useEffect(() => {
    const getData = async () => {
      try {
        // Format the query to SQL
        const formattedQuery = formatQuery(query, "sql");
        // Fetch user data based on the query
        const fetchedData = await getUsers(formattedQuery);
        // Update the user data state
        dispatch({ type: "SET_USER_DATA", payload: fetchedData });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, [query]); // Dependency array, the effect runs the query changes

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

        {/* COnditional rendering of the filter */}
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

        {/* Render the user data table */}
        <UsersTable data={userData} />
        <div>
          <h1>Query:</h1>
          <code>{formatQuery(query, "sql")}</code>
        </div>
      </div>
    </main>
  );
}
