import { io } from "socket.io-client";

const socket = io("ws://localhost:3000/");
// socket.emit('connect', () => )
socket.emit("insert:word", "aluga");
socket.on("insert:word", (data) => console.log(data));
