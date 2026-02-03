import { API_URL, getIdToken } from "./token";

export async function sendFriendRequest(recipientID) {
  const token = await getIdToken();

  const res = await fetch(`${API_URL}/friends/request/${recipientID}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (res.status === 429){
    throw new Error("Max Requests!")
  }
  if (!res.ok) {
    throw new Error(`Failed to request ${res.status}`);
  }

  return await res.json();
}

export async function getFriendRequests() {
  
  const token = await getIdToken();

  const res = await fetch(`${API_URL}/friends/request`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to user friend requests ${res.status} ${errorText}`);
  }

  return await res.json();
}


export async function acceptFriendRequest(friendID) {
  const token = await getIdToken();

  const res = await fetch(`${API_URL}/friends/acceptRequest/${friendID}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to accept friend request : ${res.status} ${errorText}`);
  }

  return await res.json();
}





