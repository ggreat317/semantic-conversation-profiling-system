import { API_URL, getIdToken } from "./token";

// Feteches all messages 

export async function loadMessages() {
  const token = await getIdToken();
  
  const res = await fetch(`${API_URL}/messages`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error("Failed to get messages");
  }

  return await res.json();
}

// Fetches older message
// ! no current limit after timestamp

export async function loadOlderMessages(room, time, limit) {
  const token = await getIdToken();
  
  const params = new URLSearchParams({
    room,
    before: time,
    limit
  });

  const res = await fetch(`${API_URL}/messages?${params.toString()}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error("Failed to get older messages");
  }

  return await res.json();
}


export function normalizeDate(value) {
  if (value instanceof Date && !isNaN(value)) {
    return value;
  }

  // Firestore Timestamp
  if (value && typeof value.toDate === "function") {
    return value.toDate();
  }

  // Mongo / API ISO string
  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    return new Date(value);
  }

  return null;
}
