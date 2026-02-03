import { auth } from '../../../config/firebase';

import { ChatScreen } from "./chatscreen";
import { ChatInput } from "./chatinput";
import { User } from 'firebase/auth';

type boolSetter = React.Dispatch<React.SetStateAction<boolean>>;

export function Chat({user, room, setLeftOpen, setRightOpen }: {setLeftOpen : boolSetter, setRightOpen : boolSetter, user : User, room : string}) {


  return (
    <div className="chat">
      <MainHeader></MainHeader>
      <header className="mobile-header">
        <button onClick={() => setLeftOpen(p => !p)}>Menu</button>
        <span>Murmur</span>
        <button onClick={() => setRightOpen(p => !p)}>Profiles</button>
      </header>
      <ChatScreen user={user} room={room}></ChatScreen>
      <ChatInput room={room}></ChatInput>
    </div>
  );
}

function MainHeader() {
  return (
    <header className="main-header">
      Your chatting as ... {auth.currentUser?.displayName}
    </header>
  );
}