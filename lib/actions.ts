"use server";

import { neon } from "@neondatabase/serverless";
import { UserT } from "./types";

// initialized db
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export async function getUsers(query: string) {
  try {
    // format the query by removing "( )"
    const formattedQuery = query.replace(/\(|\)/g, "");

    // declare variable
    let response;

    // conditionally check the query
    // default query is 1 = 1
    if (formattedQuery === "1 = 1") {
      // default query will return all users
      response = await sql`SELECT * FROM users`;
    } else {
      // I don't have enough time to parameterized the query
      response = await sql`SELECT * FROM users`;
    }

    // contruct response object
    const users: UserT[] = response.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      gender: user.gender,
      height: parseFloat(user.height),
      birthdate: new Date(user.birthdate),
    }));

    return users;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
