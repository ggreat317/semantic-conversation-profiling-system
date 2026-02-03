
import { useAuth } from '../../utilities/auth';
import { MenuButton, Room, Setter } from './leftsidebar';

export function FriendsBar({ setSidebar, friendMessages, open }: { open: boolean, setSidebar: Setter, friendMessages: Room[] }) {

  const { user } = useAuth();

  const { setRoom } = useAuth();
  const chatRooms = friendMessages.map(room => {
    return (
      <div key={room._id}>
        <MenuButton className={room._id} set={setRoom} name={room.name} />
      </div>
    );
  })

  return (
    <div className={open ? "leftsidebar open" : "leftsidebar"}>
      <div className="top">
        <span className="text big">Friends</span>
      </div>
      <div className="top">
        {chatRooms}
      </div>
      <div className=" bottom">
        <MenuButton
          className=""
          name="Exit Friends"
          set={() => setSidebar("")}
        />
      </div>
    </div>
  );
}
