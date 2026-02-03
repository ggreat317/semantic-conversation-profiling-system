import { API_URL, getIdToken } from "./token";

export async function getUserInfo(field) {
  
  const token = await getIdToken();
  
  const params = new URLSearchParams({
    field
  });

  const res = await fetch(`${API_URL}/user?${params.toString()}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to get older messages ${res.status} ${errorText}`);
  }

  return await res.json();
}

export async function loadRooms() {
  const token = await getIdToken();
  
  const res = await fetch(`${API_URL}/user/rooms`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to get rooms ${res.status} ${errorText}`);
  }

  return await res.json();
}
