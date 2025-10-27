import { io, Socket } from "socket.io-client";

export interface ChatMessage {
  id: string;
  author: string;
  text: string;
  date: string;
}

let socket: Socket;

function GetUserID(): string {
    const id = `user-${Math.floor(Math.random() * 10000)}`;
    sessionStorage.setItem("chatUserId", id);

    return id;
}

const StorageUserId: string | null = sessionStorage.getItem("chatUserId");
export let currentUserId: string = StorageUserId ? StorageUserId : GetUserID();

export function connectSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:3000");
    socket.on("connect", () => console.log("✅ Connected:", socket.id));
  }
  return socket;
}

export function getSocket(): Socket {
  if (!socket) throw new Error("Socket not connected");
  return socket;
}