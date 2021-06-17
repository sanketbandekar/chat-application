import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { transformToArrayWithId } from "../misc/helper";


const RoomContext = createContext()

export const RoomProvider = ({ children }) => {

    const [rooms, setRooms] = useState(null)

    useEffect(  () => {
        const roomListRef = database.ref('rooms')

        roomListRef.on('value', (snap) => {
            const data = transformToArrayWithId(snap.val())
            setRooms(data)
        })

        return () => {
            roomListRef.off()
        }
    }, [])
    
    return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>
}

export const useRooms = () => useContext(RoomContext)