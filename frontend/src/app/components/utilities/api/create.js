import { API_URL, getIdToken } from "./token";

export async function createMessage(message) {
  const token = await getIdToken();

  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });

  if (!res.ok) {
    throw new Error("Failed to create message");
  }

  return await res.json();
}
