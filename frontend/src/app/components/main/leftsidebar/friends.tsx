'use client'

import { useAuth } from '../../utilities/auth';
import { MenuButton, Room, Setter } from './leftsidebar';
import { getDatabase, ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import { PublicUserRTDBMap } from '../rightsidebar/profiles';

type friendRoom = {
  roomID: string,
  friendName: string
}

export function FriendsBar({ setSidebar, friendMessages, open, userID}: {userID: string, open: boolean, setSidebar: Setter, friendMessages: Room[] }) {
  const [chatRooms, setChatRooms] = useState<friendRoom[]>([]);
  const { setRoom } = useAuth();
  const db = getDatabase();

  useEffect(() => {
    async function loadRooms(){
      const rooms = await Promise.all(
        friendMessages.map(async room => {
          const snapshot = await get(ref(db, `rooms/${room._id}/members/users`));
          const data : PublicUserRTDBMap = snapshot.val()

          const friend = Object.entries(data)
          .filter(([id]) => id !== userID)

          console.log(friend[0][1].userName)
          return {
            roomID: room._id,
            friendName: friend[0][1].userName
          }
        })
      )
      setChatRooms(rooms);
    }

    loadRooms()
  }, [friendMessages])

  return (
    <div className={open ? "leftsidebar open" : "leftsidebar"}>
      <div className="top">
        <span className="text big">Friends</span>
      </div>
      <div className="top">
        {chatRooms.map(room => (
            <MenuButton
              key={room.roomID}
              className="friend"
              set={() => setRoom(room.roomID)}
              name={room.friendName}
            >
            </MenuButton>
          ))
        }
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
