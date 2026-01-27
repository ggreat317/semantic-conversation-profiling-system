
import { getAuth } from "firebase/auth";

const auth = getAuth();
// local host, usually for dev mode
// export const API_URL = "http://localhost:5000"

// the process.env.api thingy is a bit useless since its just public access info
// but it seems to be standard as they have it there

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// console.log(API_URL)

// const res = await fetch(`${API_URL}/`, {
//     method: "GET",
//   });
// console.log("resjson")
// console.log(res.json())

export async function getIdToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  return await user.getIdToken();
}