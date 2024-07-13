"use server";

import { neon } from "@neondatabase/serverless";
import { UserT } from "./types";

// initialized db
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export async function getUsers(query: string) {
  try {
    const formattedQuery = query.replace(/\(|\)/g, "");
    console.log(formattedQuery)
    // const constructedQuery = `
    // SELECT * FROM users
    // WHERE ${query}
    // `
    // console.log(constructedQuery)
    // const response = await sql`SELECT * FROM users WHERE firstname = 'Emily'`

    const response = await sql`SELECT * FROM users`;

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