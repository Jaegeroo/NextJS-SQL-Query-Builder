import { neon } from "@neondatabase/serverless";

// initialized db
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);

export async function getUsers(query: string) {
  try {
    const constructedQuery = `
    SELECT * FROM users
    WHERE ${query}
    `
    console.log(constructedQuery)

    // const response = await sql`${constructedQuery}`;
    // return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}