import { useAuth } from '../../homepage/auth';
import { MenuButton, Room, Setter} from './leftsidebar';
import { User } from 'firebase/auth';
import { ProfileRow } from '../rightsidebar/profiles';

export function DefaultBar({setSidebar, directMessages, groupChats, user} : {setSidebar: Setter, directMessages:Room[],  groupChats:Room[], user: User}) {
  const { setRoom } = useAuth();
	const userName = user.displayName;

  const directRooms = directMessages.map(room => (
		<div key={room._id}>
			<MenuButton className={room._id} set={setRoom} name={room.name} />
		</div>
	));

  const groupRooms = groupChats.map(room => (
		<div key={room._id}>
			<MenuButton className={room._id} set={setRoom} name={room.name} />
		</div>
	));
	
	return(
    <div className="sidebar slide">
      <Menu setSidebar={setSidebar}></Menu>
			<div className="">
				<div className="text">
					Direct Messages
					<div className="tabs">{directRooms}</div>
				</div>
				<div className="text">
					Group Chats
					<div className="tabs">{groupRooms}</div>
				</div>
				
			</div>
			<div className="bottom">
				{userName && <ProfileRow userID={user.uid} userName={userName} self={true} ></ProfileRow>}
				<ActualMenuButton name={"Settings"} set={()=>setSidebar("settings")}></ActualMenuButton>
			</div>
    </div>
  );
}

// made this annoyingly tidy
// copy settings not this mechanical mess

// function Options({setSidebar} : {setSidebar: Setter}){
// 	return(
// 		<div className="bottom">
// 			<ActualMenuButton name={"Profile"} set={()=>setSidebar("options")}></ActualMenuButton>
// 			<ActualMenuButton name={"Settings"} set={()=>setSidebar("settings")}></ActualMenuButton>
// 		</div>
// 	);  
// }

function Menu({setSidebar} : {setSidebar: Setter}){
	// <MenuInput></MenuInput>  
	return(
		<div className="top">
			<ActualMenuButton name={"Friends"} set={()=>setSidebar("friends")}></ActualMenuButton>
			<ActualMenuButton name={"Requests"} set={()=>setSidebar("requests")}></ActualMenuButton>
		</div>
	);
}

function MenuInput(){
	return(
		<input className="input menu-input" placeholder="Search..."></input>
	);
}

function ActualMenuButton({name, set} : {name : string, set: Setter}){
	return(
		<button 
			className="button menu-button"
			onClick={() => set(name)}
		>{name}</button> 
	);
}
