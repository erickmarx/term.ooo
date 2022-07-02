import { Server } from "socket.io";
import { App } from "./src/app";

const io = new Server();

io.on("connection", (socket) => {
  const app = new App();
  socket.on("insert:word", (word: string) => {
    app.execute(word);
    socket.emit("insert:word", app.inputedWord);
  });
});

io.listen(3000);
