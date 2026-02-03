import { useState } from "react";
import { auth, db } from '../../../config/firebase';
import { createMessage } from "../../utilities/api/create.js";

export function ChatInput({room} : {room : string}) {
  const [text, setText] = useState('');

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;
    handleMessageSubmit();
    setText("");
  }

  const handleMessageSubmit = async () => {
    const newMessageAPI = {
      text: text,
      userName: auth.currentUser?.displayName,
      room: room
    }
    createMessage(newMessageAPI)
  }

  return (
    <form className="main-message fix" onSubmit={handleMessage}>
      <input
        className="input message-input"
        placeholder="Type Message..."
        onChange={(event) => setText(event.target.value)}
        value={text}
      ></input>
      <button className="button message-send">Send</button>
    </form>
  )
}
