import { API_URL, getIdToken } from "./token";

export async function updateCustom(slot, build) {
  const token = await getIdToken();

  const res = await fetch(`${API_URL}/user/custom/${slot}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(build)
  });

  if (!res.ok) {
    throw new Error(`Failed to update custom ${res.status}`);
  }

  return await res.json();
}


