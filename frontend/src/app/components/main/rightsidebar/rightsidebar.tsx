import { User } from 'firebase/auth';
import { Profiles } from './profiles';

export function RightSidebar({user, room, open }: { open: boolean, user: User, room : string}) {

  return (
    <div className={ open ? "rightsidebar open" : "rightsidebar"}>
      <div className="text big">murmur</div>
      <div className="profiles">
        <Profiles user={user} room={room}></Profiles>
      </div>
    </div>
  );
}

